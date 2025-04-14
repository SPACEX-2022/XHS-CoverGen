import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// 设置超过此时间的文件将被清理（24小时）
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export async function GET(request: NextRequest) {
  try {
    const tempDir = path.join(process.cwd(), 'public', 'temp');
    
    // 如果目录不存在，不需要清理
    if (!fs.existsSync(tempDir)) {
      return NextResponse.json({ success: true, message: '没有临时目录，无需清理' });
    }
    
    const now = Date.now();
    const files = fs.readdirSync(tempDir);
    let deletedCount = 0;
    
    for (const file of files) {
      try {
        const filePath = path.join(tempDir, file);
        const stats = fs.statSync(filePath);
        
        // 如果文件超过最大保留时间，删除它
        if (now - stats.mtimeMs > MAX_AGE_MS) {
          fs.unlinkSync(filePath);
          deletedCount++;
        }
      } catch (err) {
        console.error(`清理文件 ${file} 时出错:`, err);
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `清理了 ${deletedCount} 个过期文件`,
      totalFiles: files.length,
      deletedFiles: deletedCount
    });
  } catch (error) {
    console.error('清理临时文件失败:', error);
    return NextResponse.json(
      { error: '服务器处理请求时出错' },
      { status: 500 }
    );
  }
} 