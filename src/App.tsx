import React, { useState } from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './app/screens/homePage';
import ProductsPage from './app/screens/productsPage';
import UserPage from './app/screens/userPage';
import OrdersPage from './app/screens/ordersPage';
import HomeNavbar from './app/components/headers/HomeNavbar';
import OtherNavbar from './app/components/headers/OtherNavbar';
import Footer from './app/components/footer';
import HelpPage from './app/screens/helpPage';
import useBasket from './app/hooks/useBasket';
import AuthenticationModal from './app/components/auth';
import './css/app.css';
import "./css/navbar.css";
import "./css/footer.css";

function App() {
  const location = useLocation();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll
  } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(true);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  /* HANDLERS */
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  return (
    <>
      {location.pathname === "/" ?
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll} /> :
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll} />}
      <Switch> {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
        <Route path="/products">
          <ProductsPage onAdd={onAdd} /> {/*onAdd={onAdd} => parent dan childga props larni paste qilish uchun */}
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
      />
    </>
  )
}




export default App;
