import React from 'react';
import { Card, CardContent, CardFooter } from '@/shared/ui/card';
import { Heart } from 'lucide-react';

export interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <Card className="overflow-hidden cursor-pointer border-none shadow-none group" onClick={onClick}>
      <CardContent className="p-0 relative aspect-[3/4] overflow-hidden rounded-xl bg-[--color-muted]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-[--color-primary] text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg">
            {product.discount}%
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${
              isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </CardContent>
      <CardFooter className="flex flex-col items-start p-2.5 gap-1">
        <span className="text-xs font-semibold text-[--color-muted-foreground] uppercase tracking-wide">
          {product.brand}
        </span>
        <h3 className="text-sm font-normal leading-tight line-clamp-2 text-gray-800">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          {product.discount > 0 && (
            <span className="text-base font-bold text-[--color-primary]">
              {product.discount}%
            </span>
          )}
          <span className="text-base font-bold text-gray-900">
            {product.price.toLocaleString()}원
          </span>
        </div>
        {product.discount > 0 && (
          <span className="text-xs text-[--color-muted-foreground] line-through">
            {Math.round(product.price / (1 - product.discount / 100)).toLocaleString()}원
          </span>
        )}
      </CardFooter>
    </Card>
  );
};
