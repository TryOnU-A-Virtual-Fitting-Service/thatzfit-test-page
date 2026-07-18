import React from 'react';
import { useLocation } from 'react-router-dom';

export const SUPPORTED_LOCALES = ['ko', 'en'] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ko';

export const localeLabels: Record<Locale, string> = {
  ko: 'KR',
  en: 'EN',
};

const localeRegion: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
};

export const ogLocales: Record<Locale, string> = {
  ko: 'ko_KR',
  en: 'en_US',
};

type DemoCopy = {
  header: {
    categories: string[];
    tryOnLabel: string;
    tryOnDescription: string;
    shippingLabel: string;
    helpLabel: string;
    languageLabel: string;
    notificationLabel: string;
    searchLabel: string;
    cartLabel: string;
  };
  home: {
    heroAlt: string;
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCta: string;
    chips: Array<{ label: string; description: string }>;
    sectionTitle: string;
    sectionSubtitle: string;
    viewAll: string;
  };
  product: {
    notFoundTitle: string;
    backHome: string;
    shareLabel: string;
    wishlistLabel: string;
    reviews: string;
    discountAmount: (amount: string) => string;
    benefits: {
      deliveryTitle: string;
      deliveryDescription: string;
      returnTitle: string;
      returnDescription: string;
    };
    infoTitle: string;
    fallbackDescription: string;
    cart: string;
    buyNow: string;
  };
  bottomNav: Array<{ label: string; path: string }>;
  footer: {
    sections: Array<{ title: string; links: string[] }>;
    helpTitle: string;
    helpHours: string;
    companyLines: string[];
    copyright: string;
  };
  seo: {
    homeTitle: string;
    homeDescription: string;
    productTitle: (name: string) => string;
    productDescription: (brand: string, name: string) => string;
  };
};

export const demoCopy: Record<Locale, DemoCopy> = {
  ko: {
    header: {
      categories: ['신상', '상의', '하의', '저지', '후디', '팬츠', '세일'],
      tryOnLabel: '',
      tryOnDescription: '입어보고 사자, 온라인에서도',
      shippingLabel: '10만원 이상 무료배송',
      helpLabel: '고객센터',
      languageLabel: '언어 선택',
      notificationLabel: '알림',
      searchLabel: '검색',
      cartLabel: '장바구니',
    },
    home: {
      heroAlt: 'Curated tops and bottoms for summer and early fall',
      heroBadge: 'THATZFIT EDITORIAL',
      heroTitle: 'Try it on before you buy',
      heroSubtitle: 'A summer-to-fall edit of clean silhouettes made for confident virtual try-on.',
      heroCta: 'Shop the edit',
      chips: [
        { label: 'Tops', description: 'Tees, jerseys, hoodies' },
        { label: 'Bottoms', description: 'Track and wide-leg pants' },
        { label: 'Try-On Ready', description: 'Clear front silhouettes' },
        { label: 'Summer to Fall', description: 'Light now, layer later' },
      ],
      sectionTitle: 'New In',
      sectionSubtitle: '2026 Summer Season',
      viewAll: '전체보기',
    },
    product: {
      notFoundTitle: '상품을 찾을 수 없습니다',
      backHome: '홈으로 돌아가기',
      shareLabel: '공유',
      wishlistLabel: '좋아요',
      reviews: '리뷰',
      discountAmount: (amount) => `${amount} 할인`,
      benefits: {
        deliveryTitle: '무료배송',
        deliveryDescription: '오늘 주문시 내일 도착',
        returnTitle: '안심구매',
        returnDescription: '7일 이내 무료 반품',
      },
      infoTitle: '상품 정보',
      fallbackDescription:
        '고품질 소재로 제작된 프리미엄 상품입니다. 세련된 디자인과 뛰어난 착용감으로 일상에서 편안하게 착용하실 수 있습니다.',
      cart: '장바구니',
      buyNow: '바로구매',
    },
    bottomNav: [
      { label: '홈', path: '/' },
      { label: '검색', path: '/search' },
      { label: '좋아요', path: '/likes' },
      { label: 'MY', path: '/my' },
    ],
    footer: {
      sections: [
        { title: '고객센터', links: ['공지사항', '자주묻는질문', '1:1 문의'] },
        { title: '쇼핑정보', links: ['배송안내', '교환/반품', '주문조회'] },
        { title: '회사소개', links: ['브랜드 스토리', '채용정보', '제휴문의'] },
      ],
      helpTitle: '고객센터',
      helpHours: '평일 10:00 - 18:00\n점심 12:00 - 13:00',
      companyLines: [
        '상호명: (주)댓츠핏 | 대표: 홍길동 | 사업자등록번호: 123-45-67890',
        '통신판매업신고: 2024-서울강남-00000 | 개인정보보호책임자: 김철수',
        '주소: 서울특별시 강남구 테헤란로 123, 4층',
      ],
      copyright: '© 2026 ThatzFit. All rights reserved.',
    },
    seo: {
      homeTitle: 'ThatzFit Demo | AI 가상 피팅',
      homeDescription:
        '여름부터 가을까지 입기 좋은 상품으로 ThatzFit AI 가상 피팅 플러그인을 체험해 보세요.',
      productTitle: (name) => `${name} | ThatzFit AI 가상 피팅 데모`,
      productDescription: (brand, name) =>
        `${brand} ${name} 상품 페이지에서 ThatzFit AI 가상 피팅 플러그인이 쇼핑 경험에 어떻게 들어가는지 확인해 보세요.`,
    },
  },
  en: {
    header: {
      categories: ['New In', 'Tops', 'Bottoms', 'Jerseys', 'Hoodies', 'Pants', 'Sale'],
      tryOnLabel: 'AI VIRTUAL TRY-ON',
      tryOnDescription: 'See how it looks on you, instantly.',
      shippingLabel: 'Free shipping on orders over $100',
      helpLabel: 'Help',
      languageLabel: 'Select language',
      notificationLabel: 'Notifications',
      searchLabel: 'Search',
      cartLabel: 'Cart',
    },
    home: {
      heroAlt: 'Curated tops and bottoms for summer and early fall',
      heroBadge: 'THATZFIT EDITORIAL',
      heroTitle: 'Try it on before you buy',
      heroSubtitle: 'A summer-to-fall edit of clean silhouettes made for confident virtual try-on.',
      heroCta: 'Shop the edit',
      chips: [
        { label: 'Tops', description: 'Tees, jerseys, hoodies' },
        { label: 'Bottoms', description: 'Track and wide-leg pants' },
        { label: 'Try-On Ready', description: 'Clear front silhouettes' },
        { label: 'Summer to Fall', description: 'Light now, layer later' },
      ],
      sectionTitle: 'New In',
      sectionSubtitle: 'Pieces selected for shape, texture, and try-on clarity',
      viewAll: 'View all',
    },
    product: {
      notFoundTitle: 'Product not found',
      backHome: 'Back to home',
      shareLabel: 'Share',
      wishlistLabel: 'Wishlist',
      reviews: 'reviews',
      discountAmount: (amount) => `${amount} off`,
      benefits: {
        deliveryTitle: 'Free shipping',
        deliveryDescription: 'Arrives tomorrow when ordered today',
        returnTitle: 'Easy returns',
        returnDescription: 'Free returns within 7 days',
      },
      infoTitle: 'Product details',
      fallbackDescription:
        'A premium everyday piece made with quality materials, a polished silhouette, and comfortable wear.',
      cart: 'Add to cart',
      buyNow: 'Buy now',
    },
    bottomNav: [
      { label: 'Home', path: '/' },
      { label: 'Search', path: '/search' },
      { label: 'Likes', path: '/likes' },
      { label: 'My', path: '/my' },
    ],
    footer: {
      sections: [
        { title: 'Support', links: ['Notice', 'FAQ', 'Contact us'] },
        { title: 'Shopping', links: ['Shipping', 'Returns', 'Order lookup'] },
        { title: 'Company', links: ['Brand story', 'Careers', 'Partnerships'] },
      ],
      helpTitle: 'Support',
      helpHours: 'Weekdays 10:00 - 18:00\nLunch 12:00 - 13:00',
      companyLines: [
        'Company: ThatzFit Inc. | CEO: Gildong Hong | Business registration: 123-45-67890',
        'Mail-order registration: 2024-Seoul Gangnam-00000 | Privacy officer: Chulsoo Kim',
        'Address: 4F, 123 Teheran-ro, Gangnam-gu, Seoul, Korea',
      ],
      copyright: '© 2026 ThatzFit. All rights reserved.',
    },
    seo: {
      homeTitle: 'ThatzFit Demo | AI Virtual Try-On',
      homeDescription:
        'Explore the ThatzFit AI virtual try-on plugin with summer-to-fall fashion products.',
      productTitle: (name) => `${name} | ThatzFit AI Virtual Try-On Demo`,
      productDescription: (brand, name) =>
        `${brand} ${name} ThatzFit demo product page. Preview how AI virtual try-on fits inside a fashion ecommerce product detail flow.`,
    },
  },
};

export function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) {
    return null;
  }

  const [language] = value.trim().toLowerCase().replace('_', '-').split('-');
  return SUPPORTED_LOCALES.includes(language as Locale)
    ? (language as Locale)
    : null;
}

export function getLocaleFromSearch(search: string): Locale | null {
  return normalizeLocale(new URLSearchParams(search).get('locale'));
}

function getBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') {
    return DEFAULT_LOCALE;
  }

  const languages =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages
      : [navigator.language];

  for (const language of languages) {
    const locale = normalizeLocale(language);
    if (locale) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}

export function useLocale(): Locale {
  const location = useLocation();
  const [browserLocale] = React.useState(getBrowserLocale);
  return getLocaleFromSearch(location.search) ?? browserLocale;
}

export function useLocaleSwitcher() {
  const location = useLocation();

  return React.useCallback(
    (nextLocale: Locale) => {
      const params = new URLSearchParams(location.search);
      params.set('locale', nextLocale);

      const search = params.toString();
      window.location.replace(
        `${location.pathname}${search ? `?${search}` : ''}${location.hash}`,
      );
    },
    [location.hash, location.pathname, location.search],
  );
}

export function getLocaleSearch(locale: Locale) {
  return `?locale=${locale}`;
}

export function formatPrice(value: number, locale: Locale) {
  const formattedValue = new Intl.NumberFormat(localeRegion[locale]).format(value);
  return locale === 'ko' ? `${formattedValue}원` : `₩${formattedValue}`;
}
