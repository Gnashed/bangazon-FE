'use client'

// import Loading from "@/Components/Loading";
import { CartItem } from "@/utils/context/CartContext";
import Button from 'react-bootstrap/Button';
import { useRemoveFromCart } from "@/utils/context/CartContext";

export default function CartPage() {
  const cartItems = localStorage.getItem('cartItems');
  const cartItemsToJson: CartItem[] = JSON.parse(cartItems);
  const removeFromCart = useRemoveFromCart();

  if (!cartItemsToJson) {
    return (
      <div className='d-flex flex-column align-items-center my-5'>
        <h1>Cart</h1>
        <h2 className="my-5">Uh oh! Your shopping cart is empty. Ready to add some items? 😊</h2>
      </div>
    )
  }

  return (
    <div className='d-flex flex-column align-items-center my-5'>
      <h1>Cart</h1>
        <div>
          {cartItemsToJson.map((item) => (
            <div className='border border-2 p-3' key={item.id}>
              <p>Id: {item.id}</p>
              {/* TODO: User needs to add item quantity */}
              <p>Item Quantity: {item.itemQuantity}</p>
              <p>Item information:</p>
              <ul>
                <li>{item.product.name}</li>
                <li>Category: {item.product.category}</li>
                <li>{item.product.description}</li>
                <li>${item.product.price}</li>
                <li>{item.product.dateAdded}</li>
              </ul>
              <Button variant='link' onClick={() => removeFromCart(item.id)}>Remove</Button>
            </div>
          ))}
      </div>
    </div>
  );
};
