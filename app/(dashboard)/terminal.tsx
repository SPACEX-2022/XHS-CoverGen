'use client';

import { useState, useEffect } from 'react';
import { Download, Heart, MessageCircle, Share2 } from 'lucide-react';

export function Terminal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const examples = [
    {
      title: "秋日穿搭指南",
      desc: "10件单品轻松搭配",
      bgGradient: "from-orange-100 to-yellow-100",
      textGradient: "from-orange-500 to-red-500",
      textColor: "text-orange-500"
    },
    {
      title: "巴黎旅行必去景点",
      desc: "不出国也能感受法式浪漫",
      bgGradient: "from-blue-100 to-purple-100",
      textGradient: "from-blue-500 to-purple-500",
      textColor: "text-blue-500"
    },
    {
      title: "家居布置小技巧",
      desc: "让你的小家温馨又时尚",
      bgGradient: "from-green-100 to-teal-100",
      textGradient: "from-green-500 to-teal-500",
      textColor: "text-green-500"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % examples.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full rounded-2xl shadow-2xl overflow-hidden bg-white relative">
      {/* 小红书风格的顶部栏 */}
      <div className="bg-white h-12 border-b flex items-center px-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-pink-500 text-sm font-medium mx-auto flex items-center">
          <svg className="h-5 w-5 mr-1" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.07 6.35H15.3V3.62c0-.35-.29-.64-.64-.64H9.69c-.35 0-.64.29-.64.64v2.73H4.29c-.35 0-.64.29-.64.64v9.56c0 2.76 2.24 5 5 5h7.07c2.76 0 5-2.24 5-5V6.99c0-.35-.29-.64-.65-.64zm-5.42 0H9.69V4.27h4.96v2.08z" />
          </svg>
          小红书
        </div>
      </div>
      
      <div className="relative pt-2">
        {examples.map((example, index) => (
          <div
            key={index}
            className={`transition-all duration-500 transform ${
              index === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute top-2 left-0 w-full'
            }`}
            style={{ display: index === activeIndex ? 'block' : 'none' }}
          >
            {/* 封面内容区域 */}
            <div className={`relative aspect-[4/3] bg-gradient-to-br ${example.bgGradient}`}>
              {/* 装饰元素 - 圆点 */}
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white opacity-10"></div>
              <div className="absolute bottom-10 left-6 w-12 h-12 rounded-full bg-white opacity-10"></div>
              
              {/* 封面文字 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className={`bg-gradient-to-r ${example.textGradient} text-transparent bg-clip-text font-bold text-3xl px-6 text-center mb-2 leading-tight`}>
                  {example.title}
                </div>
                <div className={`${example.textColor} text-xl px-4 text-center`}>
                  {example.desc}
                </div>
              </div>
            </div>
            
            {/* 底部互动区域 */}
            <div className="p-4 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-pink-500">AI</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">AI封面设计</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-gray-500">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs ml-1">289</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs ml-1">42</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Share2 className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 底部指示器 */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2">
        {examples.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeIndex ? 'bg-pink-500' : 'bg-gray-300'
            }`}
            aria-label={`切换到示例 ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
