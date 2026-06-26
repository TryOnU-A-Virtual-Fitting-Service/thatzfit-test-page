import React from 'react';
import { useLocation } from 'react-router-dom';
import { PRODUCTS, type Product } from '@/shared/consts/products';

const SITE_ORIGIN = 'https://demo.thatzfit.me';
const DEFAULT_IMAGE = `${SITE_ORIGIN}/og-image-v2.png`;
const DEFAULT_DESCRIPTION =
  'Explore a public shopping demo with the ThatzFit AI virtual try-on plugin for fashion ecommerce partners.';

function upsertMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  const existing = document.head.querySelector<HTMLMetaElement>(selector);
  const meta = existing ?? create();
  meta.content = content;
  if (!existing) {
    document.head.appendChild(meta);
  }
}

function upsertLink(selector: string, create: () => HTMLLinkElement, href: string) {
  const existing = document.head.querySelector<HTMLLinkElement>(selector);
  const link = existing ?? create();
  link.href = href;
  if (!existing) {
    document.head.appendChild(link);
  }
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
  const existing = document.getElementById(id) as HTMLScriptElement | null;
  const script = existing ?? document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data).replaceAll('<', '\\u003c');
  if (!existing) {
    document.head.appendChild(script);
  }
}

function getProduct(pathname: string) {
  const match = pathname.match(/^\/product\/(\d+)$/);
  return match ? PRODUCTS.find((product) => product.id === Number(match[1])) : undefined;
}

function productDescription(product: Product) {
  return `${product.brand} ${product.name} ThatzFit demo product page. Preview how AI virtual try-on fits inside a fashion ecommerce product detail flow.`;
}

function buildWebPageJsonLd(title: string, description: string, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: 'ThatzFit Demo',
      url: SITE_ORIGIN,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ThatzFit',
      url: 'https://thatzfit.me',
    },
  };
}

function buildProductJsonLd(product: Product, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    description: product.description ?? productDescription(product),
    image: product.image,
    url: canonicalUrl,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'KRW',
      availability: 'https://schema.org/InStock',
      url: canonicalUrl,
    },
  };
}

export const SeoManager: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    const product = getProduct(location.pathname);
    const canonicalPath = product ? `/product/${product.id}` : '/';
    const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;
    const title = product
      ? `${product.name} | ThatzFit AI Virtual Try-On Demo`
      : 'ThatzFit Demo | AI Virtual Try-On';
    const description = product ? productDescription(product) : DEFAULT_DESCRIPTION;
    const image = product?.image ?? DEFAULT_IMAGE;

    document.documentElement.lang = 'ko';
    document.title = title;

    upsertMeta('meta[name="description"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'description';
      return meta;
    }, description);
    upsertMeta('meta[name="title"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'title';
      return meta;
    }, title);
    upsertMeta('meta[property="og:title"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      return meta;
    }, title);
    upsertMeta('meta[property="og:description"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      return meta;
    }, description);
    upsertMeta('meta[property="og:url"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:url');
      return meta;
    }, canonicalUrl);
    upsertMeta('meta[property="og:image"]', () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:image');
      return meta;
    }, image);
    upsertMeta('meta[name="twitter:title"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'twitter:title';
      return meta;
    }, title);
    upsertMeta('meta[name="twitter:description"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'twitter:description';
      return meta;
    }, description);
    upsertMeta('meta[name="twitter:image"]', () => {
      const meta = document.createElement('meta');
      meta.name = 'twitter:image';
      return meta;
    }, image);
    upsertLink('link[rel="canonical"]', () => {
      const link = document.createElement('link');
      link.rel = 'canonical';
      return link;
    }, canonicalUrl);

    upsertJsonLd(
      'thatzfit-demo-structured-data',
      product ? buildProductJsonLd(product, canonicalUrl) : buildWebPageJsonLd(title, description, canonicalUrl),
    );
  }, [location.pathname]);

  return null;
};
