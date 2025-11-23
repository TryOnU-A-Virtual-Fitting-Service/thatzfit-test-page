import React from 'react';
import { ProductCard } from '@/entities/product/ui/ProductCard';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '@/shared/consts/products';

export const ProductList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full px-4 pb-8">
      <div className="w-full flex justify-center items-center p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onClick={() => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
