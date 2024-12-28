import React, { useState } from 'react';
import { Search, Home, Camera, ArrowRight, Radio, Users, FileText, MapPin, ChevronDown } from 'lucide-react';

const PropertyListing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    address: '',
    unit: ''
  });

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Quick Property Upload",
      description: "List your property in minutes with our streamlined process. Add photos and details effortlessly."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Description Generator",
      description: "Create professional property descriptions automatically with our advanced AI tools."
    },
    {
      icon: <Radio className="w-8 h-8" />,
      title: "Wide Distribution",
      description: "Reach thousands of potential tenants through our extensive network of listing partners."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Tenant Verification",
      description: "Access comprehensive screening tools with credit and background checks."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <img 
                src="/api/placeholder/120/40" 
                alt="Logo" 
                className="h-8 w-auto"
              />
              <div className="hidden md:flex items-center gap-6">
                <a href="#" className="text-gray-600 hover:text-indigo-600">Payments</a>
                <a href="#" className="text-gray-600 hover:text-indigo-600">Screening</a>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by city or ZIP"
                    className="w-64 pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-indigo-600 font-medium">Log In</button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              List Your Property
            </h1>
            <p className="text-lg text-gray-600">
              Reach quality tenants and manage your property with ease
            </p>
          </div>

          {/* Property Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white font-medium">
                  {currentStep}
                </span>
                <span>of 6</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Location</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Enter street address"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit Number (optional)
                </label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  placeholder="Apt, Suite, Unit number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-indigo-200 transition-all hover:shadow-lg">
                <div className="text-indigo-600 bg-indigo-50 p-3 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">For Tenants</h3>
              <div className="space-y-2">
                <a href="#" className="block hover:text-white transition-colors">Apply Online</a>
                <a href="#" className="block hover:text-white transition-colors">Schedule Tour</a>
                <a href="#" className="block hover:text-white transition-colors">Rent Payments</a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">For Landlords</h3>
              <div className="space-y-2">
                <a href="#" className="block hover:text-white transition-colors">List Property</a>
                <a href="#" className="block hover:text-white transition-colors">Screening</a>
                <a href="#" className="block hover:text-white transition-colors">Tenant Management</a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <div className="space-y-2">
                <a href="#" className="block hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
                <a href="#" className="block hover:text-white transition-colors">FAQs</a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <a href="#" className="block hover:text-white transition-colors">About Us</a>
                <a href="#" className="block hover:text-white transition-colors">Contact</a>
                <a href="#" className="block hover:text-white transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <img 
                src="/api/placeholder/120/40" 
                alt="Logo" 
                className="h-8 w-auto brightness-0 invert"
              />
              <span>© 2024 YourBrand. All rights reserved.</span>
            </div>
            <div className="flex gap-4">
              <img src="/api/placeholder/120/40" alt="App Store" className="h-10 w-auto" />
              <img src="/api/placeholder/120/40" alt="Play Store" className="h-10 w-auto" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PropertyListing;