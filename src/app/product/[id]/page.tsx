'use client';

import { useState, useEffect } from 'react';
import { getSingleProduct } from '@/api/productData';
import { SingleProductData } from '@/types/api';
import Button from 'react-bootstrap/Button';
import Loading from '@/Components/Loading';
import Image from 'next/image';
import { useAddToCart } from '@/utils/context/CartContext';
import Toast from 'react-bootstrap/Toast';

interface ParamsProp {
  params: {
    id: number,
  };
};

export default function ViewProductInfo({ params }: ParamsProp) {
  const addToCart = useAddToCart(); // Get the function

  const { id } = params;
  const [product, setProduct] = useState<SingleProductData | null>(null);

  // For Toast Notification
  const [show, setShow] = useState(false);
  const showToast = () => setShow(!show);

  useEffect(() => {
    getSingleProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <Loading />;

  const handleClick = () => {
    addToCart(product);
    showToast();
  }

  return (
    <div className="d-flex flex-column align-items-center my-5">
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
        <Button
        variant="primary" 
        onClick={handleClick}>Add to cart</Button>
        <Toast show={show} onClose={showToast}>
          <Toast.Header>
            <strong>Item added!</strong>
          </Toast.Header>
          <Toast.Body>
            Item successfully added to the cart.
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
};
