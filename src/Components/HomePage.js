import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/API";
import { toast } from "react-toastify";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);

  // Fetch hotels from backend
  useEffect(() => {
    API.get("/hotels")
      .then((res) => setHotels(res.data))
      .catch((err) => {
        console.error("Error loading hotels:", err);
        toast.error("Failed to load hotels");
      });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
  className="d-flex align-items-center justify-content-center text-center text-light"
  style={{
    backgroundImage: "url('https://picsum.photos/seed/hotel-hero/1600/700')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "70vh",
    position: "relative",
  }}
>
  <div
    className="overlay"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    }}


  ></div>
  <div className="container position-relative">
    <h1 className="display-4 fw-bold mb-3">Welcome to Dream Hotels</h1>
    <p className="lead mb-4">
      Find and book the perfect stay for your next trip!
    </p>
    <Link to="/hotels" className="btn btn-light btn-lg shadow">
      View Hotels
    </Link>
  </div>
</section>


      {/* Featured Hotels Section */}
      <div className="container mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-semibold">Featured Hotels</h2>
          <Link to="/hotels" className="btn btn-outline-dark btn-sm">
            View All →
          </Link>
        </div>

        {hotels.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No hotels available. Please add some!</p>
          </div>
        ) : (
          <div className="row">
            {hotels.slice(0, 4).map((hotel) => (
              <div className="col-md-3 col-sm-6 mb-4" key={hotel.id}>
                <div className="card h-100 shadow-sm border-0 rounded-3">
                <img
             src={`https://picsum.photos/seed/${hotel.city}/400/300`}
             alt={hotel.name}
            className="card-img-top"
            style={{ borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }}
            onError={(e) => {
             e.target.onerror = null;
        e.target.src =
     "https://images.unsplash.com/photo-1501117716987-c8e2a4b9d7c7?auto=format&fit=crop&w=800&q=80";
  }}
/>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{hotel.name}</h5>
                    <p className="card-text text-muted mb-2">{hotel.city}</p>
                    <p className="fw-semibold mb-3 text-primary">
                      ₹{hotel.pricePerNight}/night
                    </p>
                    <div className="mt-auto d-flex justify-content-between">
                      <Link
                        to={`/edit/${hotel.id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Edit
                      </Link>
                      <Link
                        to="/add"
                        className="btn btn-success btn-sm"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3">
        <p className="mb-0">
          © {new Date().getFullYear()} Dream Hotels — Designed with ❤️
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
