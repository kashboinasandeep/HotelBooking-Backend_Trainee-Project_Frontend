// src/Components/AddHotel.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/API";
import { toast } from "react-toastify";

const AddHotel = () => {
  const [hotel, setHotel] = useState({
    name: "",
    city: "",
    pricePerNight: "",
  });

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!hotel.name || !hotel.city || !hotel.pricePerNight) {
      toast.warn("Please fill all fields");
      return;
    }

    API.post("/hotels", hotel)
      .then(() => {
        toast.success("Hotel added successfully!");
        setHotel({ name: "", city: "", pricePerNight: "" });
        navigate("/"); // redirect to list after success
      })
      .catch((err) => {
        console.error("Error adding hotel:", err);
        const msg = err?.response?.data?.message || "Add failed";
        toast.error(msg);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Add New Hotel</h2>

      <form
        onSubmit={handleSubmit}
        className="card p-4 shadow-sm"
        style={{ maxWidth: "500px", margin: "auto" }}
      >
        <div className="mb-3">
          <label className="form-label">Hotel Name</label>
          <input
            type="text"
            name="name"
            value={hotel.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter hotel name"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            value={hotel.city}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter city"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price Per Night</label>
          <input
            type="number"
            name="pricePerNight"
            value={hotel.pricePerNight}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter price per night"
            required
          />
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success">
            Add Hotel
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-secondary ms-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHotel;
