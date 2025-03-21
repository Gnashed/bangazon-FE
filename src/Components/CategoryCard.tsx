import React from 'react';
import { ProductsForCategories } from '@/types/api';
import Link from 'next/link';

interface CategoryCardProps {
  category: string;
  itemsAvailable: number;
  products: ProductsForCategories[];
}

export default function CategoryCard({ category, itemsAvailable, products }: CategoryCardProps) {
  return (
    <div className='m-5 w-25'>
      <h2>{category} ({itemsAvailable})</h2>
      <div>
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>{product.name}</Link>
        ))}
      </div>
    </div>
  );
};
