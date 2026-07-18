import React from 'react';
import { useLocation } from 'react-router-dom';
import { trackDemoSiteVisit, trackPageView } from '@/shared/lib/analytics';
import { getLocalizedProducts } from '@/shared/consts/products';
import { demoCopy, useLocale } from '@/shared/lib/i18n';

function getPageTitle(
  pathname: string,
  products: ReturnType<typeof getLocalizedProducts>,
  homeTitle: string,
) {
  const productMatch = pathname.match(/^\/product\/(\d+)$/);
  if (productMatch) {
    const product = products.find((item) => item.id === Number(productMatch[1]));
    return product ? `${product.name} | ThatzFit Demo` : homeTitle;
  }

  return homeTitle;
}

function getPageLocation(pathname: string, search: string) {
  if (typeof window === 'undefined') {
    return `https://demo.thatzfit.me${pathname}${search}`;
  }

  return `${window.location.origin}${pathname}${search}`;
}

function getPageType(pathname: string) {
  return pathname.match(/^\/product\/\d+$/) ? 'demo_product_detail' : 'demo_home';
}

export const AnalyticsTracker: React.FC = () => {
  const location = useLocation();
  const locale = useLocale();
  const products = React.useMemo(() => getLocalizedProducts(locale), [locale]);

  React.useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`;
    const pageTitle = getPageTitle(
      location.pathname,
      products,
      demoCopy[locale].seo.homeTitle,
    );
    const pageLocation = getPageLocation(location.pathname, location.search);

    trackPageView({
      pageTitle,
      pageLocation,
      pagePath,
    });
    trackDemoSiteVisit({
      pageTitle,
      pageLocation,
      pagePath,
      pageType: getPageType(location.pathname),
    });
  }, [locale, location.pathname, location.search, products]);

  return null;
};
