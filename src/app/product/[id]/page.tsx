'use client';

import { useState, useEffect, useContext } from 'react';
import { getSingleProduct } from '@/api/productData';
import { SingleProductData } from '@/types/api';
import Button from 'react-bootstrap/Button';
import Loading from '@/Components/Loading';
import Image from 'next/image';
import { useAddToCart } from '@/utils/context/CartContext';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import { CartContext } from '@/utils/context/CartContext';

interface ParamsProp {
  params: {
    id: number,
  };
};

export default function ViewProductInfo({ params }: ParamsProp) {
  const addToCart = useAddToCart(); // Get the function
  const cartItems = useContext(CartContext);

  const { id } = params;
  const [product, setProduct] = useState<SingleProductData | null>(null);
  const [quantity, setQuantity] = useState(0);

  // For Toast Notification
  const [show, setShow] = useState(false);
  const showToast = () => setShow(!show);

  useEffect(() => {
    getSingleProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <Loading />;

  const handleClick = () => {
    if (quantity <= 0) {
      console.log('Invalid entry. Enter a number greater than 0.');
      return;
    }
    
    addToCart(product, quantity);
    showToast();
  };

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
        <Form.Group className='d-flex'>
          <Form.Label>Quantity:</Form.Label>
          <Form.Select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} aria-label='select quantity' className='mx-3'>
            <option>Select ...</option>
            {/* .map() method can accept up to three arguments. Here, two are being used - the element in the array (_) and the index (named index). The `_` means a value that isn't needed in this operation. In this case, I don't need the value because, when initializing an array of n items (like below), the values are going to be undefined.*/}
            {[...Array(4)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" className='my-5' onClick={handleClick}>Add to cart</Button>
        <Toast show={show} onClose={showToast}>
          <Toast.Header>
            <strong>Item added!</strong>
          </Toast.Header>
          <Toast.Body>
            {quantity} {product.name} successfully added to the cart.
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
};
