import React, { useState } from "react";
import { FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import Logo from "/src/assets/Logo.png";
import { Link } from "react-router-dom";

export default function Navbar({ favourites, setSearchQuery }) {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //  Update parent (App.jsx) whenever input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSearchQuery(value); 
  };

  const HandleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query);
    setShowMobileSearch(false);
  };

  return (
    <section id="Navbar" className="bg-white w-full h-auto p-4 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center space-x-4 h-30">
         
          <div className="flex items-center space-x-3">
            <button
              className="text-black md:hidden"
              onClick={() => setMenuOpen(true)}
            >
              <FiMenu className="w-7 h-7" />
            </button>
            <img src={Logo} alt="Taste Trove" className="h-30 w-40" />
          </div>

          
          <div className="flex items-center space-x-4 w-full max-w-5xl justify-end">
            
            <form
              onSubmit={HandleSearch}
              className="hidden md:flex items-center bg-gray-200 rounded-xl px-3 py-1 shadow-sm flex-grow"
            >
              <input
                type="text"
                placeholder="search for items..."
                value={query}
                onChange={handleInputChange}
                className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
              />
              <button type="submit">
                <FiSearch className="text-black w-5 h-5 mr-2 hover:text-blue-400" />
              </button>
            </form>

           
            <button
              className="md:hidden text-black"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <FiSearch className="w-6 h-6" />
            </button>

            <button className="text-black hover:text-blue-400 transition">
              <FiShoppingCart className="w-6 h-6" />
            </button>
          </div>
        </div>

        
        {showMobileSearch && (
          <form
            onSubmit={HandleSearch}
            className="flex md:hidden items-center bg-gray-200 rounded-xl px-3 py-1 shadow-sm mt-3"
          >
            <input
              type="text"
              placeholder="search..."
              value={query}
              onChange={handleInputChange}
              className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
              autoFocus
            />
            <button type="submit">
              <FiSearch className="text-black w-5 h-5 mr-2" />
            </button>
          </form>
        )}

        
        <div className="hidden md:flex flex-wrap items-center space-x-8 text-xl w-full mt-8">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-black font-semibold hover:text-blue-500"
            >
              Shop by Category
            </button>

            {dropdownOpen && (
              <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg w-40 z-50">
                <Link
                  to="/category/Coffee"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Coffee
                </Link>
                <Link
                  to="/category/Tea"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Tea
                </Link>
                <Link
                  to="/category/Latte"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  Latte
                </Link>
              </div>
            )}
          </div>

          <Link to="/favourites" className="text-black hover:text-blue-400">
            Favourites ({favourites.length})
          </Link>
          <Link to="/" className="text-black hover:text-blue-400">
            Offers
          </Link>
          <Link to="/" className="text-black hover:text-blue-400">
            Brand
          </Link>
          <Link to="/" className="text-black hover:text-blue-400">
            Recipes
          </Link>
        </div>
      </div>

      
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700 text-black">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4 text-lg">
          <Link
            to="/category/Coffee"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Coffee
          </Link>
          <Link
            to="/category/Tea"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Tea
          </Link>
          <Link
            to="/category/Latte"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Latte
          </Link>
          <Link
            to="/favourites"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Favourites ({favourites.length})
          </Link>
          <Link
            to="/"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Offers
          </Link>
          <Link
            to="/"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Brand
          </Link>
          <Link
            to="/"
            className="hover:text-blue-400"
            onClick={() => setMenuOpen(false)}
          >
            Recipes
          </Link>
        </nav>
      </div>
    </section>
  );
}
