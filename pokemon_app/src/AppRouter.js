import React from "react";
import Pokemon from './componants/Pokemon.js';
import Layout from './componants/Layout.js';
import Description from "./componants/Description.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./componants/Cart.js";
import { useState } from "react";

const AppRouter = () => {
    const [cart, setCart] = useState([]);

    return(
        <BrowserRouter>
            <Layout cart={cart} />
            <Routes>
                <Route path='/' element={<Pokemon /> } />
                <Route path='/pokemon-description/:id' element={<Description cart={cart} setCart={setCart} /> } />
                <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;