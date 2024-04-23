import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import NewDishes from "./NewDishes";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enum/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css"


/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data))
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(useDispatch());

  useEffect(() => {
    // Backend server data request => Data
    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.DISH,
    })
      .then(data => { // data ni setPopular dishes reduxStorage ga borib yuklaymiz
        setPopularDishes(data);
      })
      .catch((err) => console.log(err));

    product.getProducts({
      page: 1,
      limit: 4,
      order: "createdAt",
      // productCollection: ProductCollection.DISH,
    })
      .then(data => { // data ni setNew dishes reduxStorage ga borib yuklaymiz
        setNewDishes(data);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member.getTopUsers()
      .then((data) => { setTopUsers(data) })
      .catch((err) => { console.log(err) })
  }, []);
  // Slice: Data ni => Store ga joylaydi

  return <div className={"homepage"}>
    <Statistics />
    <PopularDishes />
    <NewDishes />
    <Advertisement />
    <ActiveUsers />
    <Events />
  </div>;
}

function err(reason: any): PromiseLike<never> {
  throw new Error("Function not implemented.");
}
