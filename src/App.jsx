import Navbar from "./Components/Navbar";
import Registration from "./Components/Registration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Items from "./Components/Items";
import { useState } from "react";
import Footer from "./Components/Footer";
import Homepage from "./Components/Home";
import Chatbot from "./Components/Chatbot"; 
function App() {
  const [favourites, setFavourites] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 

  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <Router>
      <div className="App">
        <Navbar favourites={favourites} setSearchQuery={setSearchQuery} />

        <Routes>
          
          <Route
            path="/"
            element={
              <Homepage
                favourites={favourites}
                toggleFavourite={toggleFavourite}
                searchQuery={searchQuery}
              />
            }
          />

          
          <Route path="/login" element={<Registration />} />

         
          <Route path="/register" element={<Register />} />

          
          <Route
            path="/category/:categoryName"
            element={
              <>
                <h1 className="text-3xl font-bold text-center my-6">
                  Filtered Products
                </h1>
                <Items
                  favourites={favourites}
                  toggleFavourite={toggleFavourite}
                  searchQuery={searchQuery}
                />
              </>
            }
          />

          
          <Route
            path="/favourites"
            element={
              <>
                <h1 className="text-3xl font-bold text-center my-6">
                  My Favourites
                </h1>
                <Items
                  favourites={favourites}
                  toggleFavourite={toggleFavourite}
                  showFavourites={true}
                  searchQuery={searchQuery}
                />
              </>
            }
          />
        </Routes>

        <Footer />

       
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;



