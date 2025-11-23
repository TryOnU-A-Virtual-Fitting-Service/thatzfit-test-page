import React from 'react';
import { Home, Search, Heart, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: '홈', path: '/' },
    { icon: Search, label: '검색', path: '/search' },
    { icon: Heart, label: '좋아요', path: '/likes' },
    { icon: User, label: 'MY', path: '/my' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[--color-border] md:hidden shadow-lg">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all",
                isActive ? "text-[--color-primary] scale-105" : "text-gray-500"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span className={cn("text-[10px]", isActive ? "font-bold" : "font-medium")}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
