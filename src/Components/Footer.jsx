import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
         
          <div>
            <h2 className="text-2xl font-bold mb-4">Taste_Trove</h2>
            <p className="text-gray-400">
              Discover the finest coffee and tea blends from around the world. Enjoy a curated
              selection and make every sip memorable.
            </p>
            <div className="flex space-x-4 mt-4">
              <FaFacebookF className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
              <FaTwitter className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
              <FaInstagram className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
              <FaLinkedinIn className="w-5 h-5 hover:text-blue-700 cursor-pointer" />
              <FaYoutube className="w-5 h-5 hover:text-red-600 cursor-pointer" />
            </div>
          </div>

         
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>Shop</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Blog</li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-xl font-semibold mb-4">Help Center</h3>
            <ul className="space-y-2 text-gray-400">
              <li>FAQs</li>
              <li>Shipping Information</li>
              <li>Returns & Exchanges</li>
              <li>Track Your Order</li>
              <li>Support</li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-xl font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Cookie Policy</li>
              <li>Accessibility</li>
              <li>Disclaimer</li>
            </ul>
          </div>
        </div>

       
        <div className="bg-gray-800 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-2">Subscribe to our newsletter</h3>
          <p className="text-gray-400 mb-4">Get updates on latest products and offers.</p>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow p-2 rounded-lg text-gray-400"
            />
            <button className="bg-green-600 px-4 rounded-lg hover:bg-green-700 transition">
              Subscribe
            </button>
          </div>
        </div>

       
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© 2025 Taste_Trove. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Help Center</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
