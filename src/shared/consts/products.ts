import type { Locale } from '@/shared/lib/i18n';

export type Product = {
  id: number;
  brand: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  description?: string;
};

type ProductContent = Pick<Product, 'brand' | 'name' | 'description'>;

type ProductCatalogItem = Omit<Product, keyof ProductContent> & {
  content: Record<Locale, ProductContent>;
};

const PRODUCT_CATALOG: ProductCatalogItem[] = [
  {
    id: 1,
    price: 39000,
    discount: 0,
    image: '/assets/products/product-01.webp',
    content: {
      ko: {
        brand: 'Clean Layer',
        name: '블랙 크루넥 티셔츠',
        description:
          '정면 실루엣과 넥라인이 또렷한 기본 티셔츠입니다. 단독 착용과 레이어링 모두 확인하기 좋은 데일리 상의입니다.',
      },
      en: {
        brand: 'Clean Layer',
        name: 'Black Crew Neck Tee',
        description:
          'A clean crew neck tee with a clear front silhouette and neckline, useful for checking both solo wear and layering.',
      },
    },
  },
  {
    id: 2,
    price: 69000,
    discount: 20,
    image: '/assets/products/product-02.webp',
    content: {
      ko: {
        brand: 'Urban Studio',
        name: '블랙 슬리브리스 탑',
        description:
          '암홀과 어깨선이 분명한 슬리브리스 탑입니다. 여름 단독 착용과 가을 이너 스타일링을 비교하기 좋습니다.',
      },
      en: {
        brand: 'Urban Studio',
        name: 'Black Sleeveless Top',
        description:
          'A sleeveless top with a defined shoulder line and armhole, suited for summer looks and early-fall layering.',
      },
    },
  },
  {
    id: 3,
    price: 76000,
    discount: 10,
    image: '/assets/products/product-03.webp',
    content: {
      ko: {
        brand: 'Minimalist',
        name: '블랙 버튼 가디건',
        description:
          '가벼운 두께의 버튼 가디건입니다. 티셔츠 위에 걸친 가을 초입 스타일을 확인하기 좋은 상의입니다.',
      },
      en: {
        brand: 'Minimalist',
        name: 'Black Button Cardigan',
        description:
          'A lightweight button cardigan for early-fall layering over a tee while keeping the garment shape easy to read.',
      },
    },
  },
  {
    id: 4,
    price: 98000,
    discount: 15,
    image: '/assets/products/product-04.webp',
    content: {
      ko: {
        brand: 'Soft Daily',
        name: '그레이 집업 후디',
        description:
          '후드, 지퍼, 포켓 라인이 잘 보이는 집업 후디입니다. 선선한 날씨의 캐주얼 피팅 데모에 적합합니다.',
      },
      en: {
        brand: 'Soft Daily',
        name: 'Gray Zip Hoodie',
        description:
          'A zip hoodie with visible hood, zipper, and pocket structure for casual early-fall try-on demos.',
      },
    },
  },
  {
    id: 5,
    price: 84000,
    discount: 12,
    image: '/assets/products/product-05.webp',
    content: {
      ko: {
        brand: 'Field Kit',
        name: '블루 그래픽 저지',
        description:
          '전면 그래픽과 패턴이 선명한 반팔 저지입니다. 디테일 보존이 중요한 가상피팅 확인에 좋습니다.',
      },
      en: {
        brand: 'Field Kit',
        name: 'Blue Graphic Jersey',
        description:
          'A short-sleeve jersey with clear front graphics and pattern detail, useful for checking detail preservation.',
      },
    },
  },
  {
    id: 6,
    price: 86000,
    discount: 12,
    image: '/assets/products/product-06.webp',
    content: {
      ko: {
        brand: 'Field Kit',
        name: '스트라이프 그래픽 저지',
        description:
          '스트라이프와 소매 디테일이 뚜렷한 반팔 저지입니다. 프린트가 있는 상의 피팅 품질을 보기 좋습니다.',
      },
      en: {
        brand: 'Field Kit',
        name: 'Striped Graphic Jersey',
        description:
          'A striped short-sleeve jersey with strong sleeve and print detail for reviewing printed top try-on quality.',
      },
    },
  },
  {
    id: 7,
    price: 79000,
    discount: 25,
    image: '/assets/products/product-07.webp',
    content: {
      ko: {
        brand: 'Motion Lab',
        name: '블랙 트랙 팬츠',
        description:
          '허리 밴드와 스트레이트 실루엣이 분명한 트랙 팬츠입니다. 상의와 함께 매치해 보기 좋은 하의입니다.',
      },
      en: {
        brand: 'Motion Lab',
        name: 'Black Track Pants',
        description:
          'Track pants with a clear waistband and straight silhouette, useful for pairing with summer and fall tops.',
      },
    },
  },
  {
    id: 8,
    price: 78000,
    discount: 8,
    image: '/assets/products/product-08.webp',
    content: {
      ko: {
        brand: 'Ease Studio',
        name: '베이지 와이드 핀턱 팬츠',
        description:
          '전면 핀턱과 넉넉한 라인이 보이는 와이드 팬츠입니다. 가벼운 상의와 함께 여름-가을 룩을 만들기 좋습니다.',
      },
      en: {
        brand: 'Ease Studio',
        name: 'Beige Wide Pintuck Pants',
        description:
          'Wide pants with visible front pintucks and an easy silhouette for summer-to-fall outfit combinations.',
      },
    },
  },
  {
    id: 9,
    price: 189000,
    discount: 18,
    image: '/assets/products/product-09.webp',
    content: {
      ko: {
        brand: 'North Archive',
        name: '블랙 하이넥 푸퍼 재킷',
        description:
          '볼륨감 있는 퀼팅과 하이넥 실루엣이 선명한 푸퍼 재킷입니다. 겨울 아우터의 부피감과 길이를 확인하기 좋습니다.',
      },
      en: {
        brand: 'North Archive',
        name: 'Black High-Neck Puffer Jacket',
        description:
          'A high-neck puffer with a defined quilted volume for reviewing the length and shape of winter outerwear.',
      },
    },
  },
  {
    id: 10,
    price: 92000,
    discount: 10,
    image: '/assets/products/product-10.webp',
    content: {
      ko: {
        brand: 'Daily Form',
        name: '라이트 그레이 집업 후디',
        description:
          '밝은 멜란지 컬러와 자연스러운 드레이프가 돋보이는 집업 후디입니다. 데일리 레이어드 룩을 비교하기 좋습니다.',
      },
      en: {
        brand: 'Daily Form',
        name: 'Light Gray Zip Hoodie',
        description:
          'A light melange zip hoodie with an easy drape, suited for comparing everyday layered looks.',
      },
    },
  },
  {
    id: 11,
    price: 83000,
    discount: 15,
    image: '/assets/products/product-11.webp',
    content: {
      ko: {
        brand: 'Motion Lab',
        name: '블랙 스트레이트 스웨트팬츠',
        description:
          '군더더기 없는 스트레이트 라인의 블랙 팬츠입니다. 상의와 자연스럽게 매치되는 하의 피팅을 확인할 수 있습니다.',
      },
      en: {
        brand: 'Motion Lab',
        name: 'Black Straight Sweatpants',
        description:
          'Clean black sweatpants with a straight leg for reviewing balanced top-and-bottom try-on combinations.',
      },
    },
  },
  {
    id: 12,
    price: 168000,
    discount: 20,
    image: '/assets/products/product-12.webp',
    content: {
      ko: {
        brand: 'Field Notes',
        name: '올리브 레이어드 필드 재킷',
        description:
          '코듀로이 칼라와 체크 안감이 포인트인 필드 재킷입니다. 소재와 레이어드 디테일 보존을 확인하기 좋습니다.',
      },
      en: {
        brand: 'Field Notes',
        name: 'Olive Layered Field Jacket',
        description:
          'An olive field jacket with a corduroy collar and checked lining for reviewing layered material details.',
      },
    },
  },
  {
    id: 13,
    price: 118000,
    discount: 12,
    image: '/assets/products/product-13.webp',
    content: {
      ko: {
        brand: 'Washed Works',
        name: '브라운 워시드 후디',
        description:
          '빈티지한 워싱과 여유로운 볼륨이 특징인 브라운 후디입니다. 오버핏 상의의 실루엣을 확인하기 좋습니다.',
      },
      en: {
        brand: 'Washed Works',
        name: 'Brown Washed Hoodie',
        description:
          'A brown hoodie with a vintage wash and relaxed volume for reviewing oversized top silhouettes.',
      },
    },
  },
  {
    id: 14,
    price: 96000,
    discount: 8,
    image: '/assets/products/product-14.webp',
    content: {
      ko: {
        brand: 'Cloud Standard',
        name: '애시 그레이 풀집 후디',
        description:
          '도톰한 원단과 넓은 소매 라인이 돋보이는 풀집 후디입니다. 편안한 캐주얼 핏을 비교하기 좋습니다.',
      },
      en: {
        brand: 'Cloud Standard',
        name: 'Ash Gray Full-Zip Hoodie',
        description:
          'A substantial full-zip hoodie with roomy sleeves for comparing relaxed casual fits.',
      },
    },
  },
  {
    id: 15,
    price: 154000,
    discount: 0,
    image: '/assets/products/product-15.webp',
    content: {
      ko: {
        brand: 'Archive Utility',
        name: '빈티지 올리브 유틸리티 재킷',
        description:
          '자연스러운 사용감과 포켓 구조가 살아 있는 유틸리티 재킷입니다. 워크웨어 아우터의 입체감을 확인하기 좋습니다.',
      },
      en: {
        brand: 'Archive Utility',
        name: 'Vintage Olive Utility Jacket',
        description:
          'A vintage olive utility jacket with visible wear and pocket structure for reviewing dimensional workwear outerwear.',
      },
    },
  },
  {
    id: 16,
    price: 74000,
    discount: 18,
    image: '/assets/products/product-16.webp',
    content: {
      ko: {
        brand: 'Track Standard',
        name: '버건디 사이드라인 트랙 팬츠',
        description:
          '버건디 컬러와 화이트 사이드라인이 선명한 트랙 팬츠입니다. 대비가 강한 하의 디테일 보존을 확인하기 좋습니다.',
      },
      en: {
        brand: 'Track Standard',
        name: 'Burgundy Side-Stripe Track Pants',
        description:
          'Burgundy track pants with crisp white side stripes for reviewing high-contrast bottom details.',
      },
    },
  },
];

export function getLocalizedProducts(locale: Locale): Product[] {
  return PRODUCT_CATALOG.map(({ content, ...product }) => ({
    ...product,
    ...content[locale],
  }));
}

export function getLocalizedProduct(id: number, locale: Locale): Product | undefined {
  return getLocalizedProducts(locale).find((product) => product.id === id);
}

export const PRODUCTS: Product[] = getLocalizedProducts('ko');
