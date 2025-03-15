import React from 'react';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  sellerUsername: string;
  imageUrl: string;
};

function ProductCard({ id, name, price, sellerUsername, imageUrl }: ProductCardProps) {
  return (
    <Card style={{ width: '19rem', height: '29rem' }}>
      <Card.Img variant="top" src={`${imageUrl}`} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Price: ${price.toFixed(2)}</Card.Text>
        <Link href={`/seller/${id}`} passHref>From {sellerUsername}</Link>
        <hr />
        <Link href={`/product/${id}`} passHref>View</Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
