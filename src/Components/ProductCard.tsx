import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface ProductCardProps {
  title: string;
  price: number;
  seller: string;
  url: string;
};

function ProductCard({ title, price, seller, url }: ProductCardProps) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`${url}`} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Price: {price.toFixed(2)}</Card.Text>
        <Card.Text>From {seller}</Card.Text>
        <Button variant="primary">View</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
