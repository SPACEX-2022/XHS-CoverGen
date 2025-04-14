'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Download, Share2, RefreshCcw } from 'lucide-react';
import Image from 'next/image';

interface GenerateResult {
  success: boolean;
  coverUrl: string;
  title: string;
  description: string;
  timestamp: string;
}

export default function GeneratePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateResult | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!description.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '生成过程中出现错误');
      }
      
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请稍后再试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = () => {
    // 直接触发表单提交
    handleSubmit(new Event('submit') as unknown as React.FormEvent<HTMLFormElement>);
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
                disabled={isLoading}
              />
              <textarea
                placeholder="例如：'极简风格的咖啡店，温暖的灯光下，一杯拉花咖啡放在木质桌面上，旁边散落着一些咖啡豆，整体色调温暖'"
                className="w-full min-h-32 resize-none rounded-md border border-input p-3 text-sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                disabled={isLoading}
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

      {/* 生成结果显示 */}
      {error && (
        <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}
      
      {result && (
        <div className="mt-8" id="result">
          <Card>
            <CardHeader>
              <CardTitle>生成结果</CardTitle>
              <CardDescription>
                生成时间: {new Date(result.timestamp).toLocaleString('zh-CN')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 relative">
                  <div className="aspect-square relative rounded-md overflow-hidden shadow-md">
                    {/* 使用Image组件替代img以获得更好的性能 */}
                    <img 
                      src={result.coverUrl}
                      alt="小红书封面图片" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">标题</h3>
                    <p className="text-gray-700">{result.title}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">描述</h3>
                    <p className="text-gray-700">{result.description}</p>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button className="bg-pink-500 hover:bg-pink-600">
                      <Download className="mr-2 h-4 w-4" />
                      下载图片
                    </Button>
                    <Button variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-50">
                      <Share2 className="mr-2 h-4 w-4" />
                      分享
                    </Button>
                    <Button variant="outline" onClick={handleRegenerate} disabled={isLoading}>
                      <RefreshCcw className="mr-2 h-4 w-4" />
                      重新生成
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 