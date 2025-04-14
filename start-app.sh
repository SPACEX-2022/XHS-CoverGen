#!/bin/bash

# 设置工作目录
# APP_DIR="/var/www/xhs-covergen"
# cd $APP_DIR || { echo "无法进入应用目录 $APP_DIR"; exit 1; }

# 确保环境变量文件存在
if [ ! -f ".env" ]; then
  echo "警告: .env 文件不存在，请确保环境变量已正确设置"
  exit 1
fi

# 设置Node环境
export PATH="/usr/local/node/bin:$PATH"
export NODE_ENV=production

# 检查PM2是否安装
if ! command -v pm2 &> /dev/null; then
  echo "错误: PM2未安装，请先安装PM2: npm install -g pm2"
  exit 1
fi

# 停止已存在的应用实例（如果有）
pm2 stop xhs-covergen 2>/dev/null || true

# 使用PM2启动应用
echo "正在启动应用..."
pm2 start npm --name "xhs-covergen" -- start

# 保存PM2配置，确保服务器重启后自动启动
pm2 save

echo "应用已成功启动！可以通过以下命令查看日志："
echo "pm2 logs xhs-covergen"
echo "或者查看应用状态："
echo "pm2 status" 