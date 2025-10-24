// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./Components/HomePage";
import HotelList from "./Components/HotelList";
import AddHotel from "./Components/AddHotel";
import UpdateHotel from "./Components/UpdateHotel";

function App() {
  return (
    <BrowserRouter>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Dream Hotels</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/hotels">Hotel List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add Hotel</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Application Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/add" element={<AddHotel />} />
        <Route path="/edit/:id" element={<UpdateHotel />} />
      </Routes>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </BrowserRouter>
  );
}

export default App;
