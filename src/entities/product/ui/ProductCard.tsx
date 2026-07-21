import React from 'react';
import type { Product } from '@/shared/consts/products';
import { trackAddToWishlist } from '@/shared/lib/analytics';
import { formatPrice, useLocale } from '@/shared/lib/i18n';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const productSwatches: Record<number, string[]> = {
  1: ['#171717', '#4a4a47'],
  2: ['#181816', '#6f735f'],
  3: ['#171717', '#eee9df'],
  4: ['#d8d8d4', '#25344f', '#8f969a'],
  5: ['#1273b9', '#f6f4ef'],
  6: ['#141414', '#f6f4ef', '#87aaba'],
  7: ['#101010', '#43464a'],
  8: ['#b8ad99', '#5a3d3d', '#111111'],
  9: ['#111111', '#d8d5cf'],
  10: ['#d7d7d3', '#2a2a28', '#7e7768'],
  11: ['#111111', '#7b7d7e'],
  12: ['#62624d', '#4a302c', '#d7d1c2'],
  13: ['#665249', '#2e2b28'],
  14: ['#d2d2cf', '#2d3027', '#d9d3c6'],
  15: ['#716d5b', '#4d493d'],
  16: ['#7b0f20', '#f3f0e8'],
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
}) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const locale = useLocale();

  return (
    <article
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f0ea]">
        <img
          data-thatzfit-product-image="true"
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {product.discount > 0 && (
          <div className="absolute left-3 top-3 z-20 bg-white/90 px-2.5 py-1 text-xs font-medium text-stone-800">
            -{product.discount}%
          </div>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            const nextIsLiked = !isLiked;
            setIsLiked(nextIsLiked);
            if (nextIsLiked) {
              trackAddToWishlist(product);
            }
          }}
          className="absolute right-3 top-14 z-20 flex h-8 w-8 items-center justify-center bg-white/90 text-stone-700 backdrop-blur transition-colors hover:text-stone-950 [@media(hover:hover)]:top-3"
          aria-label={product.name}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isLiked ? 'fill-stone-950 text-stone-950' : ''
            }`}
          />
        </button>
      </div>
      <div className="flex flex-col items-start gap-1.5 pt-3">
        <span className="text-xs font-semibold uppercase text-stone-500">
          {product.brand}
        </span>
        <h3 className="line-clamp-2 text-sm leading-5 text-stone-950">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          {product.discount > 0 && (
            <span className="text-sm font-semibold text-stone-500">
              {product.discount}%
            </span>
          )}
          <span className="text-sm font-semibold text-stone-950">
            {formatPrice(product.price, locale)}
          </span>
        </div>
        {product.discount > 0 && (
          <span className="text-xs text-stone-400 line-through">
            {formatPrice(
              Math.round(product.price / (1 - product.discount / 100)),
              locale,
            )}
          </span>
        )}
        <div className="mt-2 flex gap-1.5">
          {(productSwatches[product.id] ?? ['#f6f4ef']).map((color) => (
            <span
              key={color}
              className="h-3 w-3 border border-stone-300"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </article>
  );
};
