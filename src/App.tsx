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
import './css/app.css';
import "./css/navbar.css";
import "./css/footer.css";
import Test from "./app/screens/Test";
import { CartItem } from './lib/types/search';

function App() {
  const location = useLocation();

  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);//currentCart ni boshlang'ich qiymat deb belgilayapmiz

  /* HANDLERS */  //(defination->parametr)
  const onAdd = (input: CartItem) => {
    const exist: any = cartItems.find((item: CartItem) => item._id === input._id);
    if (exist) {
      const cartUpdate = cartItems.map((item: CartItem) => item._id === input._id ? { ...exist, quantity: exist.quantity + 1 } : item);
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));//"cartData" biz belgilagan nom bn localStorage ga JSON formatda joylab beradi

    } else {
      const cartUpdate = [...cartItems, { ...input }];//kirayotgan cartItemdan tashkil topgan yangi array
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate));//"cartData" biz belgilagan nom bn localStorage ga JSON formatda joylab beradi
    }
  }

  return (
    <>
      {location.pathname === "/" ? <HomeNavbar cartItems={cartItems} /> : <OtherNavbar cartItems={cartItems} />}
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
    </>
  )
}




export default App;
