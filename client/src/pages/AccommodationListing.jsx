import React, { useState } from 'react';
import { Search, Home, Camera, ArrowRight, Radio, Users, FileText, MapPin, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
      <Navbar />
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

      <Footer />

      
    </div>
  );
};

export default PropertyListing;