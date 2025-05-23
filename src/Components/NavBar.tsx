import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '@/utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="navbar">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand id="navbar-brand">Bangazon</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            {/* <Link className="nav-link mx-4" href="/">
              Dashboard
            </Link> */}
            <Link className="nav-link mx-4" href="/">
              View Seller
            </Link>
            <Link className="nav-link mx-4" href="/product/categories">
              Categories
            </Link>
            <Link className="nav-link mx-4" href="/profile">
              Profile
            </Link>
            <Link className="nav-link mx-4" href={`/order/history?uid=${user?.uid}`}>
              Orders
            </Link>
            <Link className='nav-link mx-4' href={`/cart`}>
              Cart
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
