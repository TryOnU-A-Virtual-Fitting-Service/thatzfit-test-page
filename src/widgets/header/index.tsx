import React from 'react';
import { Search, ShoppingBag, UserRound, Truck } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import {
  SUPPORTED_LOCALES,
  demoCopy,
  getLocaleSearch,
  localeLabels,
  useLocale,
  useLocaleSwitcher,
} from '@/shared/lib/i18n';

export const Header: React.FC = () => {
  const locale = useLocale();
  const setLocale = useLocaleSwitcher();
  const copy = demoCopy[locale].header;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="hidden h-9 items-center justify-between bg-stone-950 px-5 text-xs text-stone-100 md:flex lg:px-10">
        <div className="flex items-center gap-3">
          {copy.tryOnLabel && (
            <>
              <span>{copy.tryOnLabel}</span>
              <span className="text-stone-500">•</span>
            </>
          )}
          <span>{copy.tryOnDescription}</span>
        </div>
        <div className="flex items-center gap-8">
          <span className="flex items-center gap-2">
            <Truck className="h-3.5 w-3.5" />
            {copy.shippingLabel}
          </span>
          <span>{copy.helpLabel}</span>
          <div className="flex items-center gap-4" aria-label={copy.languageLabel}>
            {SUPPORTED_LOCALES.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={item === locale}
                onClick={() => setLocale(item)}
                className={`text-xs transition-colors ${
                  item === locale ? 'text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                {localeLabels[item]}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-10">
        <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4">
          <a className="flex items-center" href={`/${getLocaleSearch(locale)}`}>
            <span className="font-serif text-3xl text-stone-950 sm:text-4xl">
              ThatzFit
            </span>
          </a>
          <nav className="hidden items-center gap-12 text-base text-stone-950 md:flex">
            {copy.categories.slice(0, 3).map((category) => (
              <button
                key={category}
                className="py-2 transition-colors hover:text-stone-500"
              >
                {category}
              </button>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-1 sm:gap-3">
            <div
              className="flex rounded-full border border-stone-300 bg-white p-0.5 md:hidden"
              aria-label={copy.languageLabel}
            >
              {SUPPORTED_LOCALES.map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={item === locale}
                  onClick={() => setLocale(item)}
                  className={`h-8 min-w-9 rounded-full px-2 text-xs font-bold transition-colors ${
                    item === locale
                      ? 'bg-stone-950 text-white'
                      : 'text-stone-500 hover:text-stone-950'
                  }`}
                >
                  {localeLabels[item]}
                </button>
              ))}
            </div>
            <Button variant="ghost" size="icon" aria-label={copy.searchLabel}>
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
              aria-label={copy.notificationLabel}
            >
              <UserRound className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" aria-label={copy.cartLabel}>
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute right-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-stone-950 text-[10px] font-bold text-white">
                2
              </span>
            </Button>
          </div>
        </div>
        <div className="flex gap-8 overflow-x-auto border-t border-stone-100 py-3 text-sm text-stone-600 md:hidden">
          {copy.categories.map((category, index) => (
            <button
              key={category}
              className={`whitespace-nowrap transition-colors ${
                index === 0
                  ? 'font-semibold text-stone-950'
                  : 'hover:text-stone-950'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
