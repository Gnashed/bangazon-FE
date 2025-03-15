'use client';

import { useState, useEffect } from 'react';
import { getSingleStoreById } from '@/api/storeData';
import Image from 'next/image';
import { StoreData } from '@/types/api';
import ProductCard from '@/Components/ProductCard';

interface ParamsProp {
  params: {
    id: number;
  }
};

export default function ViewStore({ params }: ParamsProp) {
  const { id } = params;
  const [store, setStore] = useState<StoreData | null>(null);

  useEffect(() => {
    getSingleStoreById(id).then(setStore);
  }, [id]);

  return (
    <div className="d-flex flex-column text-center align-items-center my-4">
      <h1 className="my-2">{store?.seller?.username}&apos;s Store</h1>
      <Image
        className="my-3"
        src={`https://${store?.storeImageUrl}`}
        alt={`Image of store`}
        width={800}
        height={350}
        priority={true}
      />

      <div>
        {/* <h2>Categories</h2>
        <div>
          <h4>Cat. Name (QTY)</h4>
          <ul>
            <li>Item</li>
            <li>Item</li>
            <li>Item</li>
          </ul>
        </div> */}

        {store?.products.map((product) => (
          <div key={product.id}>
            {/* <h4>{product?.category} ({product?.quantityAvailable})</h4> */}
            {<h4>{store.name}</h4>}
            <ProductCard 
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              sellerUsername={store.seller.username}
              imageUrl={product.imageUrl}
              storeId={product.storeId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
