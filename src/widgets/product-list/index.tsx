import React from 'react';
import { ProductCard } from '@/entities/product/ui/ProductCard';
import { useNavigate } from 'react-router-dom';
import { getLocalizedProducts } from '@/shared/consts/products';
import { trackSelectItem, trackViewItemList } from '@/shared/lib/analytics';
import { getLocaleSearch, useLocale } from '@/shared/lib/i18n';

export const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const locale = useLocale();
  const products = React.useMemo(() => getLocalizedProducts(locale), [locale]);
  const trackedLocales = React.useRef(new Set<string>());

  React.useEffect(() => {
    if (trackedLocales.current.has(locale)) {
      return;
    }

    trackedLocales.current.add(locale);
    trackViewItemList(products);
  }, [locale, products]);

  return (
    <section className="w-full">
      <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => {
              trackSelectItem(product, { index });
              navigate(`/product/${product.id}${getLocaleSearch(locale)}`);
            }}
          />
        ))}
      </div>
    </section>
  );
};
