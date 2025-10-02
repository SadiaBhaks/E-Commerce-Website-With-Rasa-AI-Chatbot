import React, { useState } from "react";
import Cartimg from "/src/assets/Cartimg.png"; 

export default function Cart({ cart, removeFromCart }) {
  const [isOpen, setIsOpen] = useState(false);


  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
     
      <div
        className="fixed top-35 right-6 z-50 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <img src={Cartimg} alt="Cart" className="w-14 h-14" />
        {totalQuantity > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalQuantity}
          </span>
        )}
      </div>

     
      {isOpen && (
        <div className="fixed inset-0 z-40">
         
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          ></div>

         
          <div className="absolute top-0 right-0 w-96 h-full bg-white shadow-lg p-6 flex flex-col">
           
            <div className="flex justify-between items-center mb-4">
             
              <button
                onClick={() => setIsOpen(false)}
                className="text-xl font-bold text-gray-600 hover:text-black absolute top-4 left-4"
              >
                ✖
              </button>

              <h2 className="text-2xl font-bold text-center w-full">Your Cart</h2>
            </div>

           
            <div className="flex-1 overflow-y-auto space-y-4 mt-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × ${item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            
            <div className="mt-4">
              <h3 className="font-bold text-lg">
                Total: $
                {cart.reduce(
                  (sum, item) => sum + item.price * item.quantity,
                  0
                ).toFixed(2)}
              </h3>
              <button className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

