import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Image, Sparkles } from 'lucide-react';
import { Terminal } from './terminal';

export default function HomePage() {
  return (
    <main>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                小红书封面
                <span className="block text-pink-500">一键生成</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                只需输入您想要的文字描述，即可快速生成精美的小红书风格封面图片。高质量、高转化率、符合平台审美的封面图，助力您的内容获得更多曝光。
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <a href="/generate">
                  <Button
                    size="lg"
                    className="text-lg rounded-full bg-pink-500 hover:bg-pink-600"
                  >
                    立即体验
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  AI驱动设计
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  利用DeepSeek先进的AI技术，自动生成符合小红书平台美学的精美封面，无需设计经验。
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                <Image className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  高质量渲染
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  使用专业的渲染技术，确保每一张封面图片都具有高清晰度和专业品质，直接可用于发布。
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-pink-500 text-white">
                <Download className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium text-gray-900">
                  一键下载
                </h2>
                <p className="mt-2 text-base text-gray-500">
                  生成后立即下载高质量图片，支持多种尺寸和格式，满足不同发布需求。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                提升您的小红书曝光率
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                精美的封面是吸引用户点击的第一步。我们的AI生成器帮助您创建符合平台算法偏好的封面图片，增加内容曝光机会，获得更多粉丝互动。
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <a href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg rounded-full text-pink-500 border-pink-500 hover:bg-pink-50"
                >
                  了解更多功能
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
