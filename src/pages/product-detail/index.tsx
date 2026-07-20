import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLocalizedProduct } from '@/shared/consts/products';
import { Button } from '@/shared/ui/button';
import {
  trackAddToCart,
  trackAddToWishlist,
  trackBeginCheckout,
  trackViewItem,
} from '@/shared/lib/analytics';
import {
  demoCopy,
  formatPrice,
  getLocaleSearch,
  useLocale,
} from '@/shared/lib/i18n';
import { ArrowLeft, Star, Share2, Heart, Truck, Shield } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const locale = useLocale();
  const copy = demoCopy[locale].product;
  const product = getLocalizedProduct(Number(id), locale);
  const [isLiked, setIsLiked] = React.useState(false);

  React.useEffect(() => {
    if (product) {
      trackViewItem(product);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{copy.notFoundTitle}</h2>
          <Button onClick={() => navigate(`/${getLocaleSearch(locale)}`)}>
            {copy.backHome}
          </Button>
        </div>
      </div>
    );
  }

  const discountedPrice =
    product.discount > 0
      ? Math.round(product.price / (1 - product.discount / 100))
      : product.price;

  return (
    <div className="min-h-screen bg-[#f7f5f0] pb-48 text-stone-950 md:pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" aria-label={copy.shareLabel}>
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={copy.wishlistLabel}
              onClick={() => {
                const nextIsLiked = !isLiked;
                setIsLiked(nextIsLiked);
                if (nextIsLiked) {
                  trackAddToWishlist(product);
                }
              }}
            >
              <Heart
                className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
              />
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.58fr_0.42fr] md:gap-12">
          {/* Image Section - Reduced size */}
          <div>
            <div className="relative mx-auto aspect-[4/5] max-w-2xl overflow-hidden bg-[#ebe7df]">
              <img
                data-thatzfit-product-image="true"
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain p-8 md:p-12"
              />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col bg-[#f7f5f0] md:pt-8">
            {/* Brand & Title */}
            <div className="border-b border-stone-300 pb-6">
              <h2 className="mb-3 text-xs font-semibold uppercase text-stone-500">
                {product.brand}
              </h2>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 border-b border-stone-300 py-5">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-stone-900 text-stone-900"
                  />
                ))}
              </div>
              <span className="text-sm font-medium">4.8</span>
              <span className="text-sm text-stone-500">
                (1,234 {copy.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="border-b border-stone-300 py-6">
              <div className="mb-2 flex items-center gap-3">
                {product.discount > 0 && (
                  <span className="text-xl font-semibold text-[#6f7458]">
                    {product.discount}%
                  </span>
                )}
                <span className="text-3xl font-semibold">
                  {formatPrice(product.price, locale)}
                </span>
              </div>
              {product.discount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-stone-400 line-through">
                    {formatPrice(discountedPrice, locale)}
                  </span>
                  <span className="text-sm font-medium text-stone-500">
                    {copy.discountAmount(
                      formatPrice(discountedPrice - product.price, locale),
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Benefits */}
            <div className="space-y-4 border-b border-stone-300 py-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-stone-300 bg-white">
                  <Truck className="h-5 w-5 text-stone-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {copy.benefits.deliveryTitle}
                  </p>
                  <p className="text-xs text-stone-500">
                    {copy.benefits.deliveryDescription}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-stone-300 bg-white">
                  <Shield className="h-5 w-5 text-stone-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {copy.benefits.returnTitle}
                  </p>
                  <p className="text-xs text-stone-500">
                    {copy.benefits.returnDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="py-6">
              <h3 className="mb-3 text-base font-semibold">{copy.infoTitle}</h3>
              <p className="text-sm leading-7 text-stone-600">
                {product.description || copy.fallbackDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-[65px] left-0 right-0 z-40 border-t border-stone-200 bg-white p-4 shadow-[0_-12px_30px_rgba(28,27,25,0.08)] md:bottom-0">
        <div className="mx-auto flex max-w-4xl gap-3">
          <Button
            variant="outline"
            className="h-14 flex-1 rounded-none border-2 border-stone-950 text-base font-semibold text-stone-950 hover:bg-stone-100"
            onClick={() => trackAddToCart(product)}
          >
            {copy.cart}
          </Button>
          <Button
            className="h-14 flex-1 rounded-none bg-stone-950 text-base font-semibold text-white hover:bg-stone-800"
            onClick={() => trackBeginCheckout(product)}
          >
            {copy.buyNow}
          </Button>
        </div>
      </div>
    </div>
  );
};
