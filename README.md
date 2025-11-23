# 🎉 Thazfit - 입어보자 사자

**Thazfit**는 AI 기반 가상 피팅 플러그인을 체험할 수 있는 최신 이커머스 쇼핑몰 데모 사이트입니다.

## ✨ 주요 기능
- **홈페이지**: 히어로 배너, 카테고리 칩, 실시간 HOT 상품 리스트
- **상품 상세**: 고해상도 이미지 갤러리, 옵션 선택, 장바구니 담기
- **가상 피팅 플러그인**: `ThatzfitService.js` 를 통해 AI 가상 피팅 기능을 바로 테스트 가능
- **프리미엄 디자인**: Tailwind CSS 기반 그라데이션, 마이크로 애니메이션, 다크 모드 지원
- **빠른 개발 환경**: Vite + React 19 + TypeScript

## 🛠️ 기술 스택
- **React 19.2.0** – 최신 UI 라이브러리
- **TypeScript** – 정적 타입 검사
- **Vite 7.2.4** – 초고속 개발 서버 & 번들링
- **Tailwind CSS 4.1.17** – 유틸리티‑first CSS 프레임워크
- **React Router DOM 7.9.6** – SPA 라우팅 (HashRouter 사용)
- **ThatzfitService.js** – 카카오톡·카카오스토리 등에서 공유 가능한 가상 피팅 플러그인
- **ESLint + React Compiler** – 코드 품질 및 성능 최적화

## 📁 프로젝트 구조
```
thatzfit-shopping/
├─ src/
│  ├─ pages/
│  │  ├─ home/            # 메인 페이지
│  │  └─ product-detail/  # 상품 상세 페이지
│  ├─ widgets/
│  │  ├─ layout/          # 레이아웃 (Header, Footer 등)
│  │  └─ product-list/    # 상품 리스트 컴포넌트
│  ├─ entities/          # 도메인 모델
│  ├─ shared/            # 공통 유틸리티 & 컴포넌트
│  ├─ assets/            # 정적 이미지·아이콘
│  ├─ App.tsx            # 최상위 라우터 (HashRouter)
│  ├─ main.tsx           # React 진입점
│  └─ index.css          # 글로벌 스타일
├─ public/
│  └─ og-image-v2.png    # OG 이미지 (1200×630 PNG) – 캐시 회피용 버전 2
├─ vite.config.ts        # Vite 설정 (base: '/thatzfit-test-page/')
├─ tailwind.config.js    # Tailwind 설정
├─ tsconfig.json         # TypeScript 설정
└─ package.json          # 스크립트, 의존성 등
```

## 🚀 시작하기
### 요구 사항
- Node.js 18 이상
- npm (또는 Yarn)

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev
```

### 배포
```bash
# GitHub Pages 로 배포 (dist 폴더 자동 업로드)
npm run deploy
```
> **주의**: `index.html`에 설정된 메타 태그와 OG 이미지(`og-image-v2.png`)는 최신 버전이며, 카카오톡·페이스북·트위터 등에서 올바르게 미리보기가 됩니다.

## 📱 메타 태그 (핵심)
```html
<title>Thazfit - 입어보자 사자</title>
<meta name="description" content="ThatzFit 가상 피팅 플러그인을 테스트할 수 있는 쇼핑몰 사이트입니다. AI 기반 가상 피팅 기술을 체험해보세요." />
<meta property="og:title" content="Thazfit - 입어보자 사자" />
<meta property="og:description" content="ThatzFit 가상 피팅 플러그인을 테스트할 수 있는 쇼핑몰 사이트입니다. AI 기반 가상 피팅 기술을 체험해보세요." />
<meta property="og:image" content="https://tryonu-a-virtual-fitting-service.github.io/thatzfit-test-page/og-image-v2.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:site_name" content="Thazfit Shopping" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://tryonu-a-virtual-fitting-service.github.io/thatzfit-test-page/og-image-v2.png" />
<meta property="kakao:image" content="https://tryonu-a-virtual-fitting-service.github.io/thatzfit-test-page/og-image-v2.png" />
```

## 🎨 디자인 시스템
- **Primary Color**: `#ec4899` → `#f43f5e` 그라데이션
- **Typography**: 시스템 폰트 스택 (`Inter`, `Roboto` 등)
- **Animations**: `tailwindcss-animate` 로 부드러운 호버·전환 효과
- **Micro‑Interactions**: 버튼 hover, 카드 tilt 등

## 📝 라이선스
Private Project – 개인용 데모 및 학습 목적

---

Made with ❤️ using **React**, **TypeScript**, **Vite**, and **Tailwind CSS**
