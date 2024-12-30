import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Camera, ArrowRight, Radio, Users, FileText, MapPin, ChevronDown } from 'lucide-react';
import { Link} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AccommodationListing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Location
    address: '',
    unit: '',
    city: '',
    postalCode: '',
    nearestUniversity: '',

    // Property Details
    propertyType: '',
    roomType: '',
    bedrooms: '',
    bathrooms: '',
    furnished: false,
    area: '',

    // Amenities
    amenities: [],

    // Photos
    photos: [],

    // Pricing
    price: '',
    deposit: '',
    billsIncluded: false,
    minimumStay: '',

    // Contact
    contactName: '',
    email: '',
    phone: '',
    availableFrom: ''
  });

  const amenitiesList = [
    'WiFi', 'Washing Machine', 'Air Conditioning', 'Study Desk',
    'Attached Bathroom', 'Kitchen Access', 'Parking', 'TV'
  ];

  const propertyTypes = [
    'Entire House', 'Apartment', 'Shared Room', 'Single Room'
  ];

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

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
        break;
      case 2:
        if (!formData.propertyType) newErrors.propertyType = 'Property type is required';
        if (!formData.bedrooms) newErrors.bedrooms = 'Number of bedrooms is required';
        break;
      // Add validation for other steps
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(6)) return;

    try {
      const response = await fetch('/api/accommodations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors({ submit: 'Failed to submit listing' });
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Address*
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Enter street address"
                  className={`w-full pl-10 pr-4 py-3.5 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City*
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className={`w-full px-4 py-3.5 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Postal Code*
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                  className={`w-full px-4 py-3.5 rounded-lg border ${errors.postalCode ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Property Type*
              </label>
              <div className="grid grid-cols-2 gap-4">
                {propertyTypes.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({...formData, propertyType: type})}
                    className={`p-4 rounded-lg border-2 ${
                      formData.propertyType === type
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } transition-colors`}
                  >
                    <Home className="mx-auto mb-2" />
                    <span className="block text-sm font-medium">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms*
                </label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                  min="1"
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms*
                </label>
                <input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                  min="1"
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>
          </div>
        );

      // Add cases 3-6 for other steps
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">List Your Property</h1>
        <p className="mt-4 text-lg text-gray-600">
          Reach quality tenants and manage your property with ease
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white font-medium">
              {currentStep}
            </span>
            <span>of 6</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            {['Location', 'Property Details', 'Amenities', 'Photos', 'Pricing', 'Contact'][currentStep - 1]}
          </h2>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          {renderStep()}

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors font-medium text-gray-600"
              >
                Back
              </button>
            )}
            
            <button
              type="button"
              onClick={currentStep === 6 ? handleSubmit : handleNext}
              className={`px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium ${
                currentStep === 1 ? 'w-full' : 'ml-auto'
              }`}
            >
              {currentStep === 6 ? 'Submit Listing' : 'Next'}
            </button>
          </div>
        </form>


        
      </div>

                 {/* Features Grid */}
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Link key={index} className="bg-white p-6 rounded-xl border border-gray-100 hover:border-indigo-200 transition-all hover:shadow-lg">
                <div className="text-indigo-600 bg-indigo-50 p-3 rounded-lg inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
    </div>
    <Footer />
      


              </>
    
  );
};

export default AccommodationListing;