import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// 创建临时目录以确保存在
const tempDir = path.join(process.cwd(), 'public', 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// 模拟封面生成延迟
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: NextRequest) {
  try {
    // 获取请求数据
    const body = await request.json();
    const { description } = body;
    
    if (!description) {
      return NextResponse.json(
        { error: '描述内容不能为空' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-4dba6f9db9604589bdf01ed3624ada04'
    });

    const response = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages: [
            { role: "system", content: `
                你是一个经验丰富的UI设计师，擅长设计小红书风格的封面图片。
                主要在手机端展示，尺寸 430*880。
                创建一张小红书风格的封面图片，背景采用简约设计，包含微妙的艺术元素，例如浅色笔刷或便签纹理。背景色应为浅色且中性，如白色、浅蓝或浅黄，以保持清新现代感。使用用户提供的中文文本，以粗体、醒目的大字体呈现，可根据需要分为两到三行以增强视觉效果。选择一个与文本情感相符的单一 emoji，放置在文字附近，增添趣味或表达情绪。配色方案控制在少数几种颜色：背景色、黑色文字及一到两个点缀色（如 emoji 或其他细节的颜色），确保设计鲜艳但不过于杂乱。整体布局干净平衡，以文字为核心，emoji 作为点缀增强设计感，不抢风头。

                使用示例
                用户输入："今天天气真好"
                预期生成：浅蓝色背景（象征天空），粗体文字"今天天气真好"（可能分为两行），搭配一个阳光或笑脸 emoji（如 ☀️ 或 😊）。
                用户输入："我太累了"
                预期生成：浅黄色背景，粗体文字"我太累了"（可能三行排列），搭配一个疲倦或睡觉 emoji（如 😴 或 🥱）。

                字体可以比预输出的结果中稍小一点点，这样不会导致最后一个字换行。
                使用一些好看的字体，不要使用默认字体，建议使用在线字体。
                
                不需要添加其他文字进行修饰。
                记得重置浏览器默认样式。
                返回 HTML 代码即可，不要包含其他内容。
                ` },
            { role: "user", content: description }
        ],
        max_tokens: 8192,
    });

    let html = response.choices[0].message.content || '';

    // 处理HTML
    if (html.startsWith('```html')) {
      html = html.substring(7, html.length - 3).trim();
    } else if (html.startsWith('```')) {
      html = html.substring(3, html.length - 3).trim();
    }

    // 确保HTML包含字体加载监测代码
    if (!html.includes('fonts-loaded')) {
      // 如果AI没有添加字体加载监测代码，手动添加
      const fontLoadScript = `
      <script>
      document.addEventListener('DOMContentLoaded', function() {
        if ('fonts' in document) {
          document.fonts.ready.then(function() {
            const fontLoadedMarker = document.createElement('div');
            fontLoadedMarker.id = 'fonts-loaded';
            fontLoadedMarker.style.display = 'none';
            document.body.appendChild(fontLoadedMarker);
          });
        } else {
          setTimeout(function() {
            const fontLoadedMarker = document.createElement('div');
            fontLoadedMarker.id = 'fonts-loaded';
            fontLoadedMarker.style.display = 'none';
            document.body.appendChild(fontLoadedMarker);
          }, 2000);
        }
      });
      </script>
      `;
      
      if (html.includes('</body>')) {
        // 在</body>标签前插入脚本
        html = html.replace('</body>', `${fontLoadScript}</body>`);
      } else if (html.includes('</html>')) {
        // 如果没有</body>标签，在</html>标签前插入
        html = html.replace('</html>', `${fontLoadScript}</html>`);
      } else {
        // 如果连</html>标签都没有，直接附加到末尾
        html += fontLoadScript;
      }
    }

    console.log(html);

    // 使用Puppeteer渲染并截图
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true
    });
    
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 430, height: 880 });
      
      // 自定义页面响应监听，优化字体加载
      await page.setRequestInterception(true);
      page.on('request', (request) => {
        request.continue();
      });
      
      // 设置超时时间
      page.setDefaultTimeout(10000);
      
      // 注入内容
      await page.setContent(html, { 
        waitUntil: 'networkidle2',
        timeout: 10000 
      });
      
      // 等待字体加载标记元素出现或超时
      try {
        await page.waitForSelector('#fonts-loaded', { timeout: 5000 });
        console.log('字体加载完成标记已检测到');
      } catch (error) {
        console.log('等待字体加载标记超时，可能没有完全加载字体');
        // 即使超时也继续执行，给字体额外时间加载
        await sleep(2000);
      }
      
      // 再等待一小段时间确保渲染完全
      await sleep(500);
      
      // 截图
      const image = await page.screenshot({ 
        type: 'png',
        fullPage: true,
        omitBackground: false
      });
      
      // 图片保存到public/temp目录，文件名是当前时间戳
      const timestamp = Date.now();
      const filename = `${timestamp}.png`;
      const imagePath = path.join(tempDir, filename);
      fs.writeFileSync(imagePath, image);
      
      // 返回可以从浏览器访问的URL路径
      const imageUrl = `/temp/${filename}`;
  
      return NextResponse.json({
        success: true,
        coverUrl: imageUrl, // 返回可以在浏览器中访问的URL
        description: description.substring(0, 50) + (description.length > 50 ? '...' : ''),
        timestamp: new Date().toISOString(),
      });
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error('封面生成失败:', error);
    return NextResponse.json(
      { error: '服务器处理请求时出错' },
      { status: 500 }
    );
  }
} 