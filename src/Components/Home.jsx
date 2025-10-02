import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Items from "./Items";
import tea from "/src/assets/tea.jpg";
import background from "/src/assets/background.avif";
import coffee from "/src/assets/coffee.jpg";
import latte from "/src/assets/latte.jpg";
import Cart from "./Cart";

export default function Homepage({ favourites, toggleFavourite, searchQuery }) {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]); 
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  
  useEffect(() => {
  const controller = new AbortController();

  const fetchItems = async () => {
    try {
      setIsLoading(true); // start loading
      setError(null);     // reset error

      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      const res = await fetch("http://localhost:4000/api/items", {
        signal: controller.signal, // attach abort controller
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setItems(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error fetching items:", err);
        setError(err.message);
      }
    } finally {
      setIsLoading(false); 
    }
  };

  fetchItems();

  
  return () => controller.abort();
}, []);

  
  const handleViewMore = () =>
    setVisibleCount((prev) => Math.min(prev + 10, items.length));
  const handleViewLess = () =>
    setVisibleCount((prev) => Math.max(prev - 10, 10));

  return (
    <section className="w-full min-h-screen bg-gray-100 relative">
     
      <div className="relative w-full h-[70vh] flex items-center justify-center">
        <img
          src={background}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-4">Welcome to Taste_Trove</h1>
          <p className="text-lg mb-6">
            Discover the finest blends of{" "}
            <span className="font-semibold">coffee</span>, refreshing{" "}
            <span className="font-semibold">tea</span>, and creamy{" "}
            <span className="font-semibold">lattes</span>.
          </p>
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      
      <div className="text-3xl font-bold text-center m-8 "><h2>What We Offer</h2></div>
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img src={coffee} alt="Coffee" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Coffee</h2>
            <p className="text-gray-600">
              Freshly brewed with rich aromas and bold flavors, our coffee is
              perfect for kickstarting your mornings or keeping you energized.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img src={tea} alt="Tea" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Tea</h2>
            <p className="text-gray-600">
              From calming herbal infusions to strong black teas, we offer a
              wide variety of teas to soothe your soul and bring warmth.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img src={latte} alt="Latte" className="w-full h-56 object-cover" />
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Latte</h2>
            <p className="text-gray-600">
              Smooth, creamy, and crafted with love, our lattes combine espresso
              and steamed milk to deliver pure comfort in every sip.
            </p>
          </div>
        </div>
      </div>

      
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        {isLoading && <p className="text-center text-gray-500">Loading items...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>} 
        <Items
          favourites={favourites}
          toggleFavourite={toggleFavourite}
          searchQuery={searchQuery}
          items={items.slice(0, visibleCount)}
          addToCart={addToCart} 
        />

      
        <div className="flex justify-center gap-4 mt-6 mb-20">
          {visibleCount < items.length && (
            <button
              onClick={handleViewMore}
              className="px-6 py-2 bg-transparent text-red-600"
            >
              View More
            </button>
          )}
          {visibleCount > 10 && (
            <button
              onClick={handleViewLess}
              className="px-6 py-2 bg-transparent text-black"
            >
              View Less
            </button>
          )}
        </div>
      </div>

     
      <Cart cart={cart} removeFromCart={removeFromCart} />
    </section>
  );
}

