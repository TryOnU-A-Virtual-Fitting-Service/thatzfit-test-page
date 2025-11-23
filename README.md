# 🛍️ ThatZFit Shopping

현대적이고 세련된 UI/UX를 갖춘 이커머스 쇼핑몰 애플리케이션입니다.

## ✨ 주요 기능

- 🏠 **홈페이지**: 히어로 배너, 카테고리 칩, 인기 상품 목록
- 📦 **상품 상세**: 상품 이미지, 상세 정보, 옵션 선택, 장바구니 담기
- 🎨 **모던한 디자인**: Tailwind CSS를 활용한 반응형 디자인
- ⚡ **빠른 성능**: Vite 기반의 빠른 개발 및 빌드 환경
- 🔄 **React Router**: SPA 라우팅 지원

## 🛠️ 기술 스택

### Core
- **React 19.2.0** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite 7.2.4** - 빌드 도구 및 개발 서버

### Styling
- **Tailwind CSS 4.1.17** - 유틸리티 기반 CSS 프레임워크
- **tailwindcss-animate** - 애니메이션 유틸리티
- **Lucide React** - 아이콘 라이브러리

### UI Components
- **Radix UI** - 접근성 높은 UI 컴포넌트
- **class-variance-authority** - 컴포넌트 variant 관리
- **clsx & tailwind-merge** - 클래스명 유틸리티

### Routing
- **React Router DOM 7.9.6** - 클라이언트 사이드 라우팅

### Development
- **ESLint** - 코드 품질 관리
- **React Compiler** - React 성능 최적화
- **TypeScript ESLint** - TypeScript 린팅

## 📁 프로젝트 구조

```
thatzfit-shopping/
├── src/
│   ├── pages/              # 페이지 컴포넌트
│   │   ├── home/          # 홈 페이지
│   │   └── product-detail/ # 상품 상세 페이지
│   ├── widgets/           # 위젯 컴포넌트
│   │   ├── layout/        # 레이아웃 컴포넌트
│   │   ├── header/        # 헤더
│   │   ├── footer/        # 푸터
│   │   └── product-list/  # 상품 목록
│   ├── entities/          # 엔티티/모델
│   ├── shared/            # 공유 컴포넌트 및 유틸리티
│   ├── assets/            # 정적 리소스
│   ├── App.tsx            # 메인 앱 컴포넌트
│   ├── main.tsx           # 앱 진입점
│   └── index.css          # 글로벌 스타일
├── public/                # 정적 파일
└── package.json
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
npm run build
```

프로덕션 빌드가 `dist/` 폴더에 생성됩니다.

### 프리뷰

```bash
npm run preview
```

빌드된 애플리케이션을 로컬에서 미리 볼 수 있습니다.

### 린팅

```bash
npm run lint
```

## 🎨 디자인 시스템

이 프로젝트는 Tailwind CSS를 기반으로 한 커스텀 디자인 시스템을 사용합니다:

- **Primary Color**: Pink/Rose 그라데이션
- **Typography**: 시스템 폰트 스택
- **Spacing**: Tailwind 기본 스페이싱 시스템
- **Animations**: 부드러운 호버 효과 및 트랜지션

## 📱 주요 페이지

### 홈페이지 (`/`)
- 히어로 배너 (겨울 신상 컬렉션)
- 빠른 카테고리 칩 (특가, 타임특가, 무료배송 등)
- 실시간 인기 상품 목록

### 상품 상세 페이지 (`/product/:id`)
- 상품 이미지 갤러리
- 상품 정보 (이름, 가격, 설명)
- 옵션 선택 (사이즈, 색상 등)
- 장바구니 담기 기능

## 🔧 설정 파일

- `vite.config.ts` - Vite 설정
- `tailwind.config.js` - Tailwind CSS 설정
- `tsconfig.json` - TypeScript 설정
- `eslint.config.js` - ESLint 설정

## 🌟 특징

### React Compiler
이 프로젝트는 React Compiler를 활성화하여 자동 메모이제이션 및 성능 최적화를 제공합니다.

### Feature-Sliced Design
프로젝트 구조는 Feature-Sliced Design 아키텍처를 참고하여 구성되었습니다:
- **pages**: 페이지 레벨 컴포넌트
- **widgets**: 복합 UI 블록
- **entities**: 비즈니스 엔티티
- **shared**: 공유 리소스

## 📝 라이선스

Private Project

## 🤝 기여

이 프로젝트는 개인 프로젝트입니다.

---

Made with ❤️ using React + TypeScript + Vite
