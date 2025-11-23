import React from 'react';
import { Search, ShoppingBag, Bell } from 'lucide-react';
import { Button } from '@/shared/ui/button';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Top Bar */}
        <div className="flex h-14 items-center justify-between">
          <a className="flex items-center" href="/">
            <span className="font-bold text-2xl bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
              ThatzFit
            </span>
          </a>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-[--color-primary] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                2
              </span>
            </Button>
          </div>
        </div>
        
        {/* Category Tabs */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide border-b border-[--color-border] pb-0">
          {['추천', '신상', '베스트', '아우터', '상의', '하의', '원피스', '세일'].map((category, index) => (
            <button
              key={category}
              className={`py-3 px-1 text-sm font-medium whitespace-nowrap transition-colors relative ${
                index === 0 
                  ? 'text-[--color-primary]' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {category}
              {index === 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[--color-primary]"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
