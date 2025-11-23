import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '@/shared/consts/products';
import { Button } from '@/shared/ui/button';
import { ArrowLeft, Star, Share2, Heart, Truck, Shield } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = PRODUCTS.find(p => p.id === Number(id));
  const [isLiked, setIsLiked] = React.useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">상품을 찾을 수 없습니다</h2>
          <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
        </div>
      </div>
    );
  }

  const discountedPrice = product.discount > 0 
    ? Math.round(product.price / (1 - product.discount / 100))
    : product.price;

  return (
    <div className="min-h-screen bg-white pb-32 md:pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-[--color-border]">
        <div className="container mx-auto px-4 py-3 max-w-4xl flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Image Section - Reduced size */}
          <div className="w-full md:w-1/2">
            <div className="aspect-[3/4] bg-[--color-muted] rounded-lg overflow-hidden max-w-md mx-auto">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col md:w-1/2">
            {/* Brand & Title */}
            <div className="mb-4">
              <h2 className="text-sm font-bold text-[--color-muted-foreground] uppercase tracking-wide mb-2">
                {product.brand}
              </h2>
              <h1 className="text-xl font-bold mb-3 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6 pb-6 border-b border-[--color-border]">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium">4.8</span>
              <span className="text-sm text-[--color-muted-foreground]">(1,234)</span>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-[--color-border]">
              <div className="flex items-center gap-3 mb-2">
                {product.discount > 0 && (
                  <span className="text-2xl font-bold text-[--color-primary]">
                    {product.discount}%
                  </span>
                )}
                <span className="text-2xl font-bold">
                  {product.price.toLocaleString()}원
                </span>
              </div>
              {product.discount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-base text-[--color-muted-foreground] line-through">
                    {discountedPrice.toLocaleString()}원
                  </span>
                  <span className="text-sm font-medium text-red-500">
                    {(discountedPrice - product.price).toLocaleString()}원 할인
                  </span>
                </div>
              )}
            </div>

            {/* Benefits */}
            <div className="mb-6 pb-6 border-b border-[--color-border] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[--color-accent] flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[--color-primary]" />
                </div>
                <div>
                  <p className="text-sm font-medium">무료배송</p>
                  <p className="text-xs text-[--color-muted-foreground]">오늘 주문시 내일 도착</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[--color-accent] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[--color-primary]" />
                </div>
                <div>
                  <p className="text-sm font-medium">안심구매</p>
                  <p className="text-xs text-[--color-muted-foreground]">7일 이내 무료 반품</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-base font-bold mb-3">상품 정보</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {product.description || '고품질 소재로 제작된 프리미엄 상품입니다. 세련된 디자인과 뛰어난 착용감으로 일상에서 편안하게 착용하실 수 있습니다.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[--color-border] p-4 shadow-lg">
        <div className="container mx-auto max-w-4xl flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 h-14 text-base font-bold border-2 border-[--color-primary] text-[--color-primary] hover:bg-[--color-accent]"
          >
            장바구니
          </Button>
          <Button 
            className="flex-1 h-14 text-base font-bold bg-gradient-to-r from-pink-500 to-rose-500 hover:shadow-lg"
          >
            바로구매
          </Button>
        </div>
      </div>
    </div>
  );
};
