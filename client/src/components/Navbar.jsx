import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">CampusHome</div>
        <div className="hidden md:flex space-x-6">
          <button className="hover:text-blue-500">Payments</button>
          <button className="hover:text-blue-500">Screening</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            List a Accommodation
          </button>
        </div>
        <div className="md:hidden">Menu</div>
      </div>
    </nav>
  );
};

export default Navbar;
