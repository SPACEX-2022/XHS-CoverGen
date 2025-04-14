import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// 模拟封面生成延迟
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: NextRequest) {
  try {
    // 获取请求数据
    const body = await request.json();
    const { title, description } = body;

    if (!description) {
      return NextResponse.json(
        { error: '描述内容不能为空' },
        { status: 400 }
      );
    }

    // 模拟处理延迟
    await sleep(2000);

    // 模拟返回数据
    // 在实际实现中，这里会调用DeepSeek API生成HTML，然后使用Puppeteer渲染并截图
    return NextResponse.json({
      success: true,
      coverUrl: 'https://picsum.photos/800/800', // 使用随机图片作为模拟
      title: title || '小红书风格封面',
      description: description.substring(0, 50) + (description.length > 50 ? '...' : ''),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('封面生成失败:', error);
    return NextResponse.json(
      { error: '服务器处理请求时出错' },
      { status: 500 }
    );
  }
} 