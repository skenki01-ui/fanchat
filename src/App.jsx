import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Rank from "./pages/Rank";
import Pin from "./pages/Pin";
import Cards from "./pages/Cards";

export default function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Register />} />
<Route path="/register" element={<Register />} />
<Route path="/home" element={<Home />} />

{/* ⭐これが重要 */}
<Route path="/chat/:id" element={<Chat />} />

<Route path="/rank" element={<Rank />} />
<Route path="/pin" element={<Pin />} />
<Route path="/cards" element={<Cards />} />

</Routes>

</BrowserRouter>

);

}