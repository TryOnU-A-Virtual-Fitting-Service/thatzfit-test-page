import type { Product } from '@/shared/consts/products';

type GtagParams = Record<string, unknown>;
type GtagCommand =
  | ['js', Date]
  | ['config', string, GtagParams?]
  | ['event', string, GtagParams?];
type Gtag = (...args: GtagCommand) => void;

declare global {
  interface Window {
    dataLayer?: GtagCommand[];
    gtag?: Gtag;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
const CURRENCY = 'KRW';
const DEFAULT_ITEM_LIST_ID = 'home_hot_products';
const DEFAULT_ITEM_LIST_NAME = 'Home hot products';

let initializedMeasurementId: string | undefined;

type ProductListContext = {
  index?: number;
  itemListId?: string;
  itemListName?: string;
};

type PageViewParams = {
  pageTitle: string;
  pageLocation: string;
  pagePath: string;
};

function buildAnalyticsItem(product: Product, context: ProductListContext = {}) {
  return {
    item_id: String(product.id),
    item_name: product.name,
    item_brand: product.brand,
    item_category: 'Fashion',
    item_list_id: context.itemListId ?? DEFAULT_ITEM_LIST_ID,
    item_list_name: context.itemListName ?? DEFAULT_ITEM_LIST_NAME,
    index: context.index,
    price: product.price,
    discount: product.discount,
    quantity: 1,
  };
}

function sendEvent(eventName: string, params?: GtagParams) {
  if (!initAnalytics() || !window.gtag) {
    return false;
  }

  window.gtag('event', eventName, params);
  return true;
}

export function isAnalyticsEnabled(measurementId = GA_MEASUREMENT_ID) {
  return Boolean(measurementId);
}

export function initAnalytics(measurementId = GA_MEASUREMENT_ID) {
  if (!measurementId || typeof window === 'undefined') {
    return false;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args) {
      window.dataLayer?.push(args);
    };

  if (initializedMeasurementId === measurementId) {
    return true;
  }

  if (!document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"]`)) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });
  initializedMeasurementId = measurementId;
  return true;
}

export function trackPageView(params: PageViewParams) {
  return sendEvent('page_view', {
    page_title: params.pageTitle,
    page_location: params.pageLocation,
    page_path: params.pagePath,
  });
}

export function trackViewItemList(products: Product[]) {
  return sendEvent('view_item_list', {
    item_list_id: DEFAULT_ITEM_LIST_ID,
    item_list_name: DEFAULT_ITEM_LIST_NAME,
    items: products.map((product, index) =>
      buildAnalyticsItem(product, { index }),
    ),
  });
}

export function trackSelectItem(product: Product, context: ProductListContext = {}) {
  return sendEvent('select_item', {
    item_list_id: context.itemListId ?? DEFAULT_ITEM_LIST_ID,
    item_list_name: context.itemListName ?? DEFAULT_ITEM_LIST_NAME,
    items: [buildAnalyticsItem(product, context)],
  });
}

export function trackViewItem(product: Product) {
  return sendEvent('view_item', {
    currency: CURRENCY,
    value: product.price,
    items: [buildAnalyticsItem(product)],
  });
}

export function trackAddToWishlist(product: Product) {
  return sendEvent('add_to_wishlist', {
    currency: CURRENCY,
    value: product.price,
    items: [buildAnalyticsItem(product)],
  });
}

export function trackAddToCart(product: Product) {
  return sendEvent('add_to_cart', {
    currency: CURRENCY,
    value: product.price,
    items: [buildAnalyticsItem(product)],
  });
}

export function trackBeginCheckout(product: Product) {
  return sendEvent('begin_checkout', {
    currency: CURRENCY,
    value: product.price,
    items: [buildAnalyticsItem(product)],
  });
}

export function trackHeroPromotionSelect() {
  return sendEvent('select_promotion', {
    promotion_id: 'winter_sale_2026',
    promotion_name: 'Winter sale up to 70',
    creative_name: 'home_hero',
    creative_slot: 'home_hero_primary_cta',
  });
}

function trackVirtualTryOnEvent(eventName: string, flowStep: string) {
  return sendEvent(eventName, {
    flow_name: 'virtual_try_on',
    flow_step: flowStep,
    plugin_surface: 'demo_site',
  });
}

export function trackPluginLoaded() {
  return trackVirtualTryOnEvent('thatzfit_plugin_loaded', 'plugin_loaded');
}

export function trackPluginOpen() {
  return trackVirtualTryOnEvent('thatzfit_plugin_open', 'plugin_open');
}

export function trackPluginClose() {
  return trackVirtualTryOnEvent('thatzfit_plugin_close', 'plugin_close');
}

export function trackCaptureStart() {
  return trackVirtualTryOnEvent('thatzfit_capture_start', 'capture_start');
}

export function trackCaptureEnd() {
  return trackVirtualTryOnEvent('thatzfit_capture_end', 'capture_end');
}
