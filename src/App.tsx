import React from 'react';
import {Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/MainPage/MainPage";
import {ShoppingCart} from "./pages/ShoppingCart/ShoppingCart";
import {Navigation} from "./components/Navigation/Navigation";
import "./styles/app.scss"

function App() {
  return (
      <>
          <Navigation/>
          <Routes>
              <Route path={"/"} element={<MainPage/>}/>
              <Route path={"/shoppingCart"} element={<ShoppingCart/>}/>
          </Routes>
      </>
  );
}

export default App;