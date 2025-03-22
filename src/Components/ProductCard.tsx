import React from 'react';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  sellerUsername: string;
  imageUrl: string;
  storeId: number;
};

function ProductCard({ id, name, price, sellerUsername, imageUrl, storeId }: ProductCardProps) {

  return (
    <Card style={{ width: '13rem', height: '37rem' }}>
      <Card.Img variant="top" src={`${imageUrl}`} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Price: ${price.toFixed(2)}</Card.Text>
        <Link href={`/store/${storeId}`} passHref>From {sellerUsername}</Link>
        <hr />
        <Link href={`/product/${id}`} passHref>View</Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
