// src/Components/UpdateHotel.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/API";
import { toast } from "react-toastify";

const UpdateHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [hotel, setHotel] = useState({
    name: "",
    city: "",
    pricePerNight: "",
  });

  // Fetch the hotel details by ID
  useEffect(() => {
    API.get(`/hotels`)
      .then((res) => {
        const found = res.data.find((h) => h.id === parseInt(id));
        if (found) setHotel(found);
        else toast.error("Hotel not found");
      })
      .catch((err) => {
        console.error("Error fetching hotels:", err);
        toast.error("Failed to load hotel details");
      });
  }, [id]);

  // Handle input changes
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

    API.put(`/hotels/${id}`, hotel)
      .then(() => {
        toast.success("Hotel updated successfully");
        navigate("/");
      })
      .catch((err) => {
        console.error("Update failed:", err);
        const msg = err?.response?.data?.message || "Update failed";
        toast.error(msg);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Update Hotel</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm" style={{ maxWidth: "500px", margin: "auto" }}>
        <div className="mb-3">
          <label className="form-label">Hotel Name</label>
          <input
            type="text"
            name="name"
            value={hotel.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter hotel name"
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
          />
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success">
            Update
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

export default UpdateHotel;
