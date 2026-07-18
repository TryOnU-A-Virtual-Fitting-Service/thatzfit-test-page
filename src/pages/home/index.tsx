import React from 'react';
import { ProductList } from '@/widgets/product-list';
import { ChevronRight } from 'lucide-react';
import { trackHeroPromotionSelect } from '@/shared/lib/analytics';
import { demoCopy, useLocale } from '@/shared/lib/i18n';
import { getLocalizedProducts } from '@/shared/consts/products';

export const HomePage: React.FC = () => {
  const locale = useLocale();
  const copy = demoCopy[locale].home;
  const heroProducts = React.useMemo(
    () => getLocalizedProducts(locale).slice(0, 3),
    [locale],
  );

  return (
    <div className="min-h-screen bg-[#f7f5f0] text-stone-950">
      <section
        aria-labelledby="editorial-hero-title"
        className="border-b border-stone-200 bg-[#f7f5f0]"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:min-h-[560px] lg:grid-cols-[0.46fr_0.54fr]">
          <div className="min-w-0 flex flex-col justify-center px-5 py-10 sm:px-8 sm:py-14 lg:px-16 lg:py-16">
            <div className="mb-6 flex items-center gap-4 text-sm text-stone-600 lg:mb-8">
              <span className="h-px w-12 bg-stone-400" aria-hidden="true" />
              <span>{copy.heroBadge}</span>
            </div>
            <h1
              id="editorial-hero-title"
              className="max-w-xl break-words text-balance font-serif text-[44px] leading-none text-stone-950 sm:text-[64px] lg:text-[76px]"
            >
              {copy.heroTitle}
            </h1>
            <p className="mt-6 max-w-md break-words text-base leading-7 text-stone-600 sm:text-lg lg:mt-7">
              {copy.heroSubtitle}
            </p>
            <div className="mt-8 flex gap-3 lg:mt-10">
              <button
                className="min-h-12 flex-1 whitespace-normal border border-stone-950 bg-stone-950 px-5 py-3 text-sm font-medium leading-tight text-white transition-colors hover:bg-stone-800 sm:flex-none sm:px-8"
                onClick={trackHeroPromotionSelect}
              >
                {copy.heroCta}
              </button>
              <button className="min-h-12 flex-1 whitespace-normal border border-stone-400 bg-transparent px-5 py-3 text-sm font-medium leading-tight text-stone-900 transition-colors hover:border-stone-950 sm:flex-none sm:px-8">
                {copy.chips[1]?.label}
              </button>
            </div>
            <div className="mt-10 hidden max-w-xl grid-cols-2 gap-x-8 gap-y-5 border-t border-stone-300 pt-6 sm:grid lg:mt-12">
              {copy.chips.map((chip) => (
                <div key={chip.label}>
                  <p className="text-sm font-semibold text-stone-950">
                    {chip.label}
                  </p>
                  <p className="mt-1 break-words text-sm leading-5 text-stone-500">
                    {chip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="relative min-h-[180px] overflow-hidden bg-[#ebe7df] sm:min-h-[320px] lg:min-h-[560px]"
            aria-label={copy.heroAlt}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(235,231,223,0.2))]" />
            <div className="absolute left-8 top-8 hidden text-xs text-stone-500 lg:block">
              01 / 16
            </div>
            <div className="relative grid h-full grid-cols-3 items-center gap-3 px-6 py-8 sm:gap-4 sm:px-12 sm:py-12 lg:px-16">
              {heroProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`flex h-full items-center justify-center ${
                    index === 1 ? 'translate-y-10' : ''
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-[140px] w-full object-contain sm:max-h-[260px] lg:max-h-[420px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8 flex items-end justify-between gap-5">
            <div>
              <h2 className="font-serif text-3xl leading-tight text-stone-950">
                {copy.sectionTitle}
              </h2>
              <p className="mt-2 text-sm text-stone-500">
                {copy.sectionSubtitle}
              </p>
            </div>
            <button className="flex items-center gap-2 border-b border-stone-950 pb-1 text-sm text-stone-950 transition-colors hover:text-stone-500">
              {copy.viewAll}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <ProductList />
        </div>
      </section>
    </div>
  );
};
