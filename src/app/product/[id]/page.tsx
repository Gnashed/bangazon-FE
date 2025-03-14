'use client';

import { useState, useEffect } from 'react';
import { getSingleProduct } from '@/api/productData';
import { SingleProductData } from '@/types/api';
import Button from 'react-bootstrap/Button';

interface ParamsProp {
  params: {
    id: number,
  };
};

export default function ViewProductInfo({ params }: ParamsProp) {
  const { id } = params;
  const [product, setProduct] = useState<SingleProductData | null>(null);

  useEffect(() => {
    getSingleProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <h1>Product Info</h1>
      <h4>{product?.name}</h4>
      <img src={product?.imageUrl} alt={`${product.name}`} width={350} height={350} />
      <div>
        <h6>{product?.category}</h6>
        <p>From {product?.store?.seller?.username}</p>
        <p>{product?.description}</p>
      </div>
      <div>
        <p>${product?.price}</p>
        {/* TODO: Make stock status render dynamic based on a bool */}
        <p>In stock</p>
        <p>Quantity:</p>
        {/* TODO: add field for quantity */}
        <Button variant="primary">Add to cart</Button>
      </div>
    </>
  );
}
