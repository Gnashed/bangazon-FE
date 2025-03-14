import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface ProductCardProps {
  name: string;
  price: number;
  sellerUsername: string;
  imageUrl: string;
};

function ProductCard({ name, price, sellerUsername, imageUrl }: ProductCardProps) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${imageUrl}`} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Price: ${price.toFixed(2)}</Card.Text>
        <Card.Text>From {sellerUsername}</Card.Text>
        <Button variant="primary">View</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
