import React from 'react';
import { Instagram, Youtube, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-12 mt-auto pb-24 md:pb-12 border-t border-[--color-border]">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[--color-primary] hover:text-[--color-primary] transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[--color-primary] hover:text-[--color-primary] transition-colors">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-[--color-primary] hover:text-[--color-primary] transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 text-sm">고객센터</h3>
            <ul className="space-y-2 text-sm text-[--color-muted-foreground]">
              <li><a href="#" className="hover:text-[--color-primary] transition-colors">공지사항</a></li>
              <li><a href="#" className="hover:text-[--color-primary] transition-colors">자주묻는질문</a></li>
              <li><a href="#" className="hover:text-[--color-primary] transition-colors">1:1 문의</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm">쇼핑정보</h3>
            <ul className="space-y-2 text-sm text-[--color-muted-foreground]">
              <li><a href="#" className="hover:text-[--color-primary] transition-colors">배송안내</a></li>
              <li><a href="#" className="hover:text-[--color-primary] transition-colors">교환/반품</a></li>
              <li><a href="#" className="hover:text-[--color-primary] transition-colors">주문조회</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm">회사소개</h3>
            <ul className="space-y-2 text-sm text-[--color-muted-foreground]">
              <li><a href="#" className="hover:text-[--color-primary] transition-colors">브랜드 스토리</a></li>
              <li><a href="#" className="hover:text-[--color-primary] transition-colors">채용정보</a></li>
              <li><a href="#" className="hover:text-[--color-primary] transition-colors">제휴문의</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-sm">고객센터</h3>
            <p className="text-2xl font-bold text-[--color-primary] mb-2">1588-0000</p>
            <p className="text-xs text-[--color-muted-foreground]">
              평일 10:00 - 18:00<br />
              점심 12:00 - 13:00
            </p>
          </div>
        </div>

        {/* Company Info */}
        <div className="border-t border-[--color-border] pt-8">
          <div className="text-xs text-[--color-muted-foreground] space-y-1 mb-4">
            <p>상호명: (주)댓츠핏 | 대표: 홍길동 | 사업자등록번호: 123-45-67890</p>
            <p>통신판매업신고: 2024-서울강남-00000 | 개인정보보호책임자: 김철수</p>
            <p>주소: 서울특별시 강남구 테헤란로 123, 4층</p>
          </div>
          <p className="text-xs text-center text-[--color-muted-foreground]">
            © 2024 ThatzFit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
