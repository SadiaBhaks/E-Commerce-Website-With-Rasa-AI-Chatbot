import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import React from "react";

function Items({
  favourites = [],
  toggleFavourite,
  showFavourites = false,
  searchQuery = "",
  addToCart,
  items = [], 
}) {
  const { categoryName } = useParams();

 
  let displayedItems = items;

  if (showFavourites) {
    displayedItems = displayedItems.filter((item) =>
      favourites.includes(item.id)
    );
  }

  if (categoryName) {
    displayedItems = displayedItems.filter(
      (item) => item.category.toLowerCase() === categoryName.toLowerCase()
    );
  }

  if (searchQuery.trim() !== "") {
    displayedItems = displayedItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div className="my-10">
      {displayedItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No items found matching your search.
        </p>
      ) : (
        <>
         
          
<div className="flex space-x-4 overflow-x-auto scrollbar-hide sm:hidden">
  {displayedItems.map((item) => (
    <div key={item.id} className="flex-shrink-0 w-64">
      <ItemCard
        item={item}
        favourites={favourites}
        toggleFavourite={toggleFavourite}
        addToCart={addToCart}
      />
    </div>
  ))}
</div>


          {/* Grid layout for tablet/desktop */}
          <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-8xl mx-auto px-6">
            {displayedItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                favourites={favourites}
                toggleFavourite={toggleFavourite}
                addToCart={addToCart}   
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}


function ItemCard({ item, favourites, toggleFavourite, addToCart }) {
  return (
    <div className="border shadow-lg p-5 text-center relative bg-white  ">
      {/* Favourite */}
      <button
        onClick={() => toggleFavourite(item.id)}
        className="absolute top-2 right-1 text-red-900 text-xl"
      >
        {favourites.includes(item.id) ? <BsHeartFill /> : <BsHeart />}
      </button>

      <img
        src={item.image_url}
        alt={item.name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
      <p className="text-gray-600">{item.description}</p>
      <p className="mt-2 font-semibold text-blue-900">${item.price}</p>

      <button
        onClick={() => addToCart(item)}
        className="bg-green-600 mt-3 p-2 text-white rounded-lg w-full hover:bg-gray-600 hover:text-black transition"
      >
        Add To Cart
      </button>
    </div>
  );
}

export default Items;
