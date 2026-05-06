import React from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/shared/lib/analytics';
import { PRODUCTS } from '@/shared/consts/products';

function getPageTitle(pathname: string) {
  const productMatch = pathname.match(/^\/product\/(\d+)$/);
  if (productMatch) {
    const product = PRODUCTS.find((item) => item.id === Number(productMatch[1]));
    return product ? `${product.name} | ThatzFit Demo` : 'Product | ThatzFit Demo';
  }

  return 'ThatzFit Demo | AI Virtual Try-On';
}

function getPageLocation(pathname: string, search: string) {
  if (typeof window === 'undefined') {
    return `https://demo.thatz.fit/#${pathname}${search}`;
  }

  return `${window.location.origin}${window.location.pathname}${window.location.search}#${pathname}${search}`;
}

export const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    const pagePath = `#${location.pathname}${location.search}`;
    trackPageView({
      pageTitle: getPageTitle(location.pathname),
      pageLocation: getPageLocation(location.pathname, location.search),
      pagePath,
    });
  }, [location.pathname, location.search]);

  return null;
};
