'use client';

import { useState, useEffect } from 'react';
import { getSingleProduct } from '@/api/productData';
import { SingleProductData } from '@/types/api';
import Button from 'react-bootstrap/Button';
import Loading from '@/Components/Loading';
import Image from 'next/image';

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

  if (!product) return <Loading />;

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Product Info</h1>
      <h4>{product?.name}</h4>
      <Image
        src={`${product.imageUrl}`}
        alt={`Image of ${product.name}`}
        width={350}
        height={350}
      />
      <div>
        <h6>{product?.category}</h6>
        <p>From {product?.store?.seller?.username}</p>
        <p>{product?.description}</p>
      </div>
      <div>
        <p>${product?.price}</p>
        <p>{product.quantityAvailable > 0 ? 'In stock': 'Sold out'}</p>
        {/* TODO: add field for quantity */}
        <p>Quantity:</p>
        <Button variant="primary">Add to cart</Button>
      </div>
    </div>
  );
};
