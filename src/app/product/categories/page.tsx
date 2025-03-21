'use client';

import { useState, useEffect } from 'react';
import CategoryCard from '@/Components/CategoryCard';
import { ProductsInCategoriesData } from '@/types/api';
import { getCategoriesWithProducts } from '@/api/productData';

export default function ProductCategoriesPage() {
  const [categories, setCategories] = useState<ProductsInCategoriesData[] | null>(null);

  useEffect(() => {
    getCategoriesWithProducts().then(setCategories);
  }, []);

  return (
    <div className='d-flex flex-column align-items-center my-5'>
      <h1>Product Categories</h1>

      <div className='d-flex flex-wrap justify-content-center my-5'>
        {categories?.map((category) => (
          <CategoryCard 
            key={category.category}
            category={category.category}
            itemsAvailable={category.itemsAvailable}
            products={category.products}
          />
        ))}
      </div>
    </div>
  );
};
