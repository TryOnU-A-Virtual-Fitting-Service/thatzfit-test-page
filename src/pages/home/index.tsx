import React from 'react';
import { ProductList } from '@/widgets/product-list';
import { ChevronRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative h-[45vh] w-full overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-orange-50">
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero" 
          className="w-full h-full object-cover mix-blend-multiply opacity-80"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-bold text-[--color-primary]">🎉 WINTER SALE UP TO 70%</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900">
              겨울 신상 컬렉션
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-700">
              따뜻하고 스타일리시한 겨울 아이템
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-3.5 rounded-full font-bold text-base hover:shadow-lg hover:scale-105 transition-all">
              지금 쇼핑하기
            </button>
          </div>
        </div>
      </div>

      {/* Quick Category Chips */}
      <div className="w-full px-4 py-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {[
              { emoji: '🔥', label: '오늘의 특가' },
              { emoji: '⚡', label: '타임특가' },
              { emoji: '🎁', label: '무료배송' },
              { emoji: '💝', label: '신규회원' },
              { emoji: '🌟', label: '베스트' },
            ].map((chip) => (
              <button
                key={chip.label}
                className="flex items-center gap-1.5 px-4 py-2 bg-[--color-muted] rounded-full text-sm font-medium whitespace-nowrap hover:bg-[--color-accent] transition-colors"
              >
                <span>{chip.emoji}</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="w-full px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">지금 HOT한 상품 🔥</h2>
              <p className="text-sm text-[--color-muted-foreground] mt-0.5">실시간 인기 상품을 만나보세요</p>
            </div>
            <button className="flex items-center gap-1 text-sm font-medium text-[--color-muted-foreground] hover:text-[--color-primary] transition-colors">
              전체보기
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <ProductList />

    </div>
  );
};
