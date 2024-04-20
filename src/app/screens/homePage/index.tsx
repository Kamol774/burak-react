import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import NewDishes from "./NewDishes";
import "../../../css/home.css"

export default function HomePage() {
  // Selector: Store dan => Data ni qabul qilib olish
  useEffect(() => {
    // Backend server data request => Data

    // Slice: Data ni => Store ga joylaydi
  }, []);


  return <div className={"homepage"}>
    <Statistics />
    <PopularDishes />
    <NewDishes />
    <Advertisement />
    <ActiveUsers />
    <Events />
  </div>;
}