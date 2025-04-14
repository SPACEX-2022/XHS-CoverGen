'use client';

import { useState, useEffect } from 'react';
import { Download, Heart, MessageCircle, Share2, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function Terminal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState([false, false, false]);
  const examples = [
    {
      title: "今天天气真不错",
      image: "/examples/cover1.png",
      likes: 312,
      comments: 56
    },
    {
      title: "约会拍照技巧",
      image: "/examples/cover2.png",
      likes: 289,
      comments: 42
    },
    {
      title: "深圳领取失业金",
      image: "/examples/cover3.png",
      likes: 176,
      comments: 38
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % examples.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="w-full h-full overflow-hidden relative">
      {/* 小红书风格的顶部栏 */}
      <div className="mt-5 bg-white h-10 border-b flex items-center px-3">
        <div className="text-pink-500 text-xs font-medium mx-auto flex items-center">
          <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.07 6.35H15.3V3.62c0-.35-.29-.64-.64-.64H9.69c-.35 0-.64.29-.64.64v2.73H4.29c-.35 0-.64.29-.64.64v9.56c0 2.76 2.24 5 5 5h7.07c2.76 0 5-2.24 5-5V6.99c0-.35-.29-.64-.65-.64zm-5.42 0H9.69V4.27h4.96v2.08z" />
          </svg>
          小红书
        </div>
      </div>
      
      <div className="relative flex justify-center">
        {examples.map((example, index) => (
          <div
            key={index}
            className={`transition-all duration-500 transform ${
              index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute top-0 left-0 right-0 mx-auto'
            }`}
            style={{ display: index === activeIndex ? 'block' : 'none' }}
          >
            {/* 封面内容区域 - 使用实际图片，调整为竖版比例，贴合手机屏幕尺寸 */}
            <div className="relative w-full bg-pink-50">
              <div className="aspect-[43/88]">
                {!imagesLoaded[index] && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Sparkles className="h-8 w-8 text-pink-400 animate-pulse mb-2" />
                    <span className="text-sm text-pink-500">AI生成图片中...</span>
                  </div>
                )}
                
                <div className="absolute inset-0">
                  <Image 
                    src={example.image} 
                    alt={example.title}
                    fill
                    className={`object-cover transition-opacity duration-300 ${imagesLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                    priority={index === 0}
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
                
                {/* 输入提示覆盖在图片上 */}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs z-10">
                  <span className="font-medium">提示词:</span> {example.title}
                </div>
                
                {/* AI生成标识 */}
                <div className="absolute bottom-2 right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full px-3 py-1 flex items-center z-10">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI生成
                </div>
              </div>
            </div>
            
            {/* 底部互动区域 */}
            <div className="p-3 bg-white w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center">
                    <span className="text-[10px] font-medium text-pink-500">AI</span>
                  </div>
                  <span className="text-xs font-medium text-gray-900">AI封面设计 </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-gray-500">
                    <Heart className="h-3 w-3" />
                    <span className="text-[10px] ml-1">{example.likes}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MessageCircle className="h-3 w-3" />
                    <span className="text-[10px] ml-1">{example.comments}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Share2 className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 底部指示器 */}
      <div className="absolute bottom-14 left-0 right-0 flex justify-center space-x-2">
        {examples.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index === activeIndex ? 'bg-pink-500' : 'bg-gray-300'
            }`}
            aria-label={`切换到示例 ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
