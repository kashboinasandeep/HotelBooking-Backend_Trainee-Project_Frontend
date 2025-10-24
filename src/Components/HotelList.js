// src/Components/HotelList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/API";
import { toast } from "react-toastify";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  // Load all hotels on component mount
  useEffect(() => {
    API.get("/hotels")
      .then((res) => setHotels(res.data))
      .catch((err) => {
        console.error("Error loading hotels:", err);
        toast.error("Failed to load hotels");
      });
  }, []);

  // Delete hotel function
  const deleteHotel = (id) => {
    API.delete(`/hotels/${id}`)
      .then(() => {
        setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
        toast.success("Hotel deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting hotel:", err);
        const msg = err?.response?.data?.message || "Delete failed";
        toast.error(msg);
      });
  };

  // Toast-based confirmation before delete
  const confirmDelete = (id) => {
    const toastId = `delete-hotel-${id}`; // unique per hotel

    if (!toast.isActive(toastId)) {
      toast(
        ({ closeToast }) => (
          <div>
            <p>Are you sure you want to delete this hotel?</p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
              <button
                onClick={() => {
                  deleteHotel(id);
                  closeToast();
                }}
                className="btn btn-sm btn-danger"
              >
                Yes
              </button>
              <button onClick={closeToast} className="btn btn-sm btn-secondary">
                No
              </button>
            </div>
          </div>
        ),
        { autoClose: false, toastId } // assign unique ID
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Hotel List</h2>

      <div className="d-flex justify-content-end mb-3">
        <Link to="/add" className="btn btn-success">
          + Add Hotel
        </Link>
      </div>

      {hotels.length === 0 ? (
        <p>No hotels available. Try adding one!</p>
      ) : (
        <table className="table table-bordered table-striped shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Hotel Name</th>
              <th>City</th>
              <th>Price Per Night (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>{hotel.id}</td>
                <td>{hotel.name}</td>
                <td>{hotel.city}</td>
                <td>{hotel.pricePerNight}</td>
                <td>
                  <Link
                    to={`/edit/${hotel.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => confirmDelete(hotel.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HotelList;
