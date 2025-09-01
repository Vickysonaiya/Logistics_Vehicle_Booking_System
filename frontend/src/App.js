import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AddVehicle from "./pages/AddVehicle";
import SearchBook from "./pages/SearchBook";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Add Vehicle</Link> | <Link to="/search">Search & Book</Link>
      </nav>
      <Routes>
        <Route path="/" element={<AddVehicle />} />
        <Route path="/search" element={<SearchBook />} />
      </Routes>
    </BrowserRouter>
  );
}
