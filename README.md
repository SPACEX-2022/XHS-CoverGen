# XHS-CoverGen - 小红书封面生成器

基于Next.js构建的小红书风格封面图片生成工具。只需输入文字描述，即可快速生成精美的小红书风格封面图片。

## 🚀 功能特点

- 🎨 根据用户输入文本生成小红书风格封面图片
- 🔄 利用DeepSeek AI API生成符合小红书美学的HTML
- 📱 响应式设计，支持多种设备访问
- 🛠️ 基于Next.js和React的现代化前端架构
- 🔒 完善的用户认证系统

## 🔧 技术栈

- **前端框架**: Next.js 15.3.0, React 19.1.0
- **样式解决方案**: Tailwind CSS 4.1.1
- **UI组件**: Shadcn UI (基于Radix UI)
- **数据库**: PostgreSQL, Drizzle ORM
- **API调用**: DeepSeek AI API
- **图像渲染**: Puppeteer
- **认证**: 自定义认证系统
- **支付处理**: Stripe

## 📋 功能流程

1. 用户输入文本描述
2. 系统构建优化的prompt发送给DeepSeek AI API
3. DeepSeek生成符合小红书风格的HTML代码
4. 服务器使用Puppeteer渲染HTML
5. Puppeteer截图生成最终图片
6. 将生成的图片返回给前端并展示给用户
7. 用户可以下载或分享生成的封面图片

## 🛠️ 本地开发

### 环境要求

- Node.js 18+
- pnpm
- Docker (可选，用于PostgreSQL)

### 安装步骤

1. 克隆代码库:
   ```bash
   git clone https://github.com/yourusername/XHS-CoverGen.git
   cd XHS-CoverGen
   ```

2. 安装依赖:
   ```bash
   pnpm install
   ```

3. 环境变量配置:
   ```bash
   cp .env.example .env
   ```
   编辑.env文件，填入必要的API密钥和配置

4. 启动开发服务器:
   ```bash
   pnpm dev
   ```

5. 打开浏览器访问 http://localhost:3000

### 数据库设置

如果需要完整功能，请设置PostgreSQL数据库:

```bash
# 使用Docker启动PostgreSQL
docker-compose up -d

# 设置数据库
pnpm db:setup

# 生成数据库迁移
pnpm db:generate

# 应用迁移
pnpm db:migrate
```

## 🚀 部署

项目可以轻松部署到Vercel或其他支持Next.js的平台:

```bash
pnpm build
```

## 📄 许可证

本项目采用MIT许可证。详见LICENSE文件。

---

项目基于[Next.js SaaS Starter](https://vercel.com/templates/next.js/next-js-saas-starter)模板开发。

## 部署说明

本项目使用GitHub Actions自动部署到腾讯云服务器。

### 配置GitHub Secrets

在GitHub仓库的Settings > Secrets > Actions中添加以下secrets：

- `TENCENT_HOST`: 腾讯云服务器IP地址
- `TENCENT_USERNAME`: SSH用户名
- `TENCENT_SSH_PRIVATE_KEY`: SSH私钥内容
- `TENCENT_SSH_PORT`: SSH端口（默认22）
- `NEXT_PUBLIC_APP_URL`: 应用URL
- `DATABASE_URL`: 数据库连接URL
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe公钥
- `STRIPE_SECRET_KEY`: Stripe密钥
- `DEEPSEEK_API_KEY`: DeepSeek API密钥

### 手动触发部署

你可以在GitHub仓库的Actions选项卡中手动触发部署工作流。

### 自动部署

当代码推送到main分支时，GitHub Actions将自动触发部署流程。
