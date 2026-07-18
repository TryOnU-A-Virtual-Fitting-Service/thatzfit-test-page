import React from 'react';
import { Home, Search, Heart, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/shared/lib/utils';
import { demoCopy, getLocaleSearch, useLocale } from '@/shared/lib/i18n';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locale = useLocale();
  const copy = demoCopy[locale];

  const navIcons = [Home, Search, Heart, User];
  const navItems = copy.bottomNav.map((item, index) => ({
    ...item,
    icon: navIcons[index],
  }));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200 bg-white md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => navigate(`${item.path}${getLocaleSearch(locale)}`)}
              className={cn(
                'flex h-full w-full flex-col items-center justify-center space-y-1 transition-colors',
                isActive ? 'text-[#6f7458]' : 'text-stone-500'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive && 'stroke-[2.5]')} />
              <span className={cn('text-[10px]', isActive ? 'font-semibold' : 'font-medium')}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
