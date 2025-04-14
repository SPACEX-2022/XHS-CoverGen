'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export default function GeneratePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!description.trim()) return;
    
    setIsLoading(true);
    // 这里将来会添加生成图片的API调用
    // 目前只是模拟加载状态
    setTimeout(() => {
      setIsLoading(false);
      // 处理生成结果
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">生成小红书封面</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          输入您想要展示的文字内容，AI将为您生成精美的小红书风格封面图片
        </p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>封面内容</CardTitle>
          <CardDescription>
            请描述您想要在封面中展示的内容，越详细越好
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="标题（可选）"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
              <textarea
                placeholder="例如：'极简风格的咖啡店，温暖的灯光下，一杯拉花咖啡放在木质桌面上，旁边散落着一些咖啡豆，整体色调温暖'"
                className="w-full min-h-32 resize-none rounded-md border border-input p-3 text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-500">提示：</p>
              <ul className="text-sm text-gray-500 space-y-1 list-disc list-inside">
                <li>详细描述想要的风格、色调和元素</li>
                <li>包含关键词能提高生成效果</li>
                <li>可以指定文字布局和图片结构</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-pink-500 hover:bg-pink-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  生成中...
                </>
              ) : (
                <>
                  开始生成
                  <Sparkles className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* 未来会在这里展示生成结果 */}
      <div className="mt-8" id="result">
        {/* 生成结果将显示在这里 */}
      </div>
    </div>
  );
} 