import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Home,
  DollarSign,
  Camera,
  CheckSquare,
  Users,
  FileText,
  Trash2,
  Radio,
  ChevronRight,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MapInput from '../components/maps/MapInput';
import axios from 'axios';
import { toast } from 'react-toastify';


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

    // Accomodation Details
    propertyType: '',
    bedrooms: '',
    beds: '',
    bathrooms: '',
    furnished: false,
    area: '',

    // Amenities
    amenities: [],

    // Photos
    photos: [],

    //Location
    lat: null,
    lng: null,

    // Pricing
    price: '',
    deposit: '',
    billsIncluded: false,
    minimumStay: '',

    // Contact
    contactName: '',
    email: '',
    phone: '',
    availableFrom: '',
  });

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: 'Quick Accommodation Upload',
      description:
        'List your accommodation in minutes with our streamlined process. Add photos and details effortlessly.',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Smart Description Generator',
      description:
        'Create professional property descriptions automatically with our advanced AI tools.',
    },
    {
      icon: <Radio className="w-8 h-8" />,
      title: 'Wide Distribution',
      description:
        'Reach thousands of potential tenants through our extensive network of listing partners.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Tenant Verification',
      description:
        'Access comprehensive screening tools with credit and background checks.',
    },
  ];

  const amenitiesList = [
    'WiFi',
    'Washing Machine',
    'Air Conditioning',
    'Study Desk',
    'Attached Bathroom',
    'Kitchen Access',
    'Parking',
    'TV',
    'None',
  ];

  const propertyTypes = [
    'Entire House',
    'Apartment',
    'Shared Room',
    'Single Room',
  ];
  const [universities, setUniversities] = useState([]);

  const [loading, setLoading] = useState(false); // To track loading state
  const [isSubmitted, setIsSubmitted] = useState(false); // To track successful submission


  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get('/universities');
        setUniversities(response.data);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.address.trim())
          newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.postalCode.trim())
          newErrors.postalCode = 'Postal code is required';
        if (!formData.nearestUniversity.trim())
          newErrors.nearestUniversity = 'Nearest university is required';
        break;
      case 2:
        if (!formData.propertyType)
          newErrors.propertyType = 'Property type is required';
        if (!formData.bedrooms)
          newErrors.bedrooms = 'Number of bedrooms is required';
        if (!formData.beds)
          newErrors.beds = 'Number of beds is required';
        if (!formData.bathrooms)
          newErrors.bathrooms = 'Number of bathrooms is required';
        if (!formData.area)
          newErrors.area = 'Total area is required';
        break;
      case 3:
        if (formData.amenities.length === 0)
          newErrors.amenities = 'Select at least one amenity';
        break;
      case 4:
        if (formData.photos.length === 0)
          newErrors.photos = 'Add at least one photo';
        if (formData.photos.length > 5)
          newErrors.photos = 'Maximum five photos only'
        break;
      case 5:
        if (formData.lat.length === 0 || formData.lng.length === 0)
          newErrors.coordinates = 'Coordinates are required'
        break;
      case 6:
        if (!formData.price)
          newErrors.price = 'Price is required';
        if (!formData.deposit)
          newErrors.deposit = 'Security Deposit amount is required';
        if (!formData.minimumStay)
          newErrors.minimumStay = 'Minimum stay is required';
        break;
      case 7:
        if (!formData.contactName.trim())
          newErrors.contactName = 'Contact name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
          }
        }
        if (!formData.phone.trim())
          newErrors.phone = 'Phone number is required';
        if (!formData.availableFrom.trim())
          newErrors.availableFrom = 'Available date is required';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the current step before proceeding
    if (!validateStep(currentStep)) {
      return;
    }

    setLoading(true); // Set loading state to true when starting the submission process

    try {
      const data = new FormData();

      // Append all form fields to the FormData object
      for (const [key, value] of Object.entries(formData)) {
        if (key === 'photos') {
          // Handle file uploads (if `photos` is an array of files)
          value.forEach((file) => data.append('photos', file));
        } else {
          // Append other key-value pairs
          data.append(key, value);
        }
      }

      console.log('Submitting Form Data:', Object.fromEntries(data.entries()));

      // Submit the data to the backend API
      const response = await axios.post('/listing/list', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle successful response
      if (response.status === 201 || response.status === 200) {
        toast('Listing created successfully!', { type: 'success' });
        setIsSubmitted(true); // Mark submission as successful
        navigate('/dashboard'); // Redirect to the home or dashboard page
      } else {
        // Handle validation or other server-side errors
        setErrors((prevErrors) => ({
          ...prevErrors,
          submit: response.data.message || 'Submission failed.',
        }));
      }
    } catch (error) {
      // Log error for debugging purposes
      console.error('Error submitting form:', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        submit: 'An error occurred during submission. Please try again.',
      }));
    } finally {
      setLoading(false); // Reset loading state when done
    }
  };



  const handleCheckboxChange = (amenity) => {
    if (formData.amenities.includes(amenity)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter((a) => a !== amenity),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenity],
      });
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);

    // Debugging: Log the selected files
    console.log('Selected files:', files);

    // Validate files (e.g., check file type and size)
    const validFiles = files.filter((file) =>
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== files.length) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        photos: 'Only image files are allowed. Maximum image size 5MB.',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        photos: '',
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      photos: validFiles,
    }));
  };

  const handlePhotoDelete = (index) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos.splice(index, 1);
    setFormData({
      ...formData,
      photos: updatedPhotos,
      // Also remove from photoFiles if stored
      // photoFiles: formData.photoFiles.filter((_, i) => i !== index),
    });
  };

  const updateCoordinates = (coords) => {
    setFormData((prevData) => ({
      ...prevData,
      lat: coords.lat,
      lng: coords.lng,
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Accommodation Address*
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter street address"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>
              {errors.address && (
                <p className="mt-1 text-sm text-red-500">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Unit/Suite (Optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  placeholder="Enter unit or suite number"
                  className="w-full py-3 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                City*
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="Enter city"
                className={`w-full px-4 py-3 rounded-lg border ${errors.city ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Postal Code*
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
                placeholder="Enter postal code"
                className={`w-full px-4 py-3 rounded-lg border ${errors.postalCode ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.postalCode && (
                <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700"></label>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Nearest University*
              </label>
              <select
                value={formData.nearestUniversity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nearestUniversity: e.target.value,
                  })
                }
                className={`w-full px-4 py-3 rounded-lg border ${errors.nearestUniversity ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              >
                <option value="" className="text-gray-500">Select a university</option>
                {universities.map((uni) => (
                  <option key={uni._id} value={uni.name}>
                    {uni.name}
                  </option>
                ))}
              </select>
              {errors.nearestUniversity && (
                <p className="mt-1 text-sm text-red-500">{errors.nearestUniversity}</p>
              )}
            </div>

          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Accommodation Type*
              </label>
              <div className="grid grid-cols-2 gap-4">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, propertyType: type })
                    }
                    className={`p-4 rounded-lg border-2 ${formData.propertyType === type
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                      } transition-colors flex flex-col items-center`}
                  >
                    {type === 'Entire House' && <Home className="mb-2" />}
                    {type === 'Apartment' && <Home className="mb-2" />}
                    {type === 'Shared Room' && <Home className="mb-2" />}
                    {type === 'Single Room' && <Home className="mb-2" />}
                    <span className="text-sm font-medium">{type}</span>
                  </button>
                ))}
              </div>
              {errors.propertyType && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.propertyType}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Number of Bedrooms*
              </label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) =>
                  setFormData({ ...formData, bedrooms: e.target.value })
                }
                min="1"
                placeholder="e.g., 2"
                className={`w-full px-4 py-3 rounded-lg border ${errors.bedrooms ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.bedrooms && (
                <p className="mt-1 text-sm text-red-500">{errors.bedrooms}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Number of Beds*
              </label>
              <input
                type="number"
                value={formData.beds}
                onChange={(e) =>
                  setFormData({ ...formData, beds: e.target.value })
                }
                min="1"
                placeholder="e.g., 2"
                className={`w-full px-4 py-3 rounded-lg border ${errors.beds ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.beds && (
                <p className="mt-1 text-sm text-red-500">{errors.beds}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Number of Bathrooms*
              </label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={(e) =>
                  setFormData({ ...formData, bathrooms: e.target.value })
                }
                min="1"
                placeholder="e.g., 1"
                className={`w-full px-4 py-3 rounded-lg border ${errors.bathrooms ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.bathrooms && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.bathrooms}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Total Area (sq ft)*
              </label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) =>
                  setFormData({ ...formData, area: e.target.value })
                }
                min="100"
                placeholder="e.g., 1200"
                className={`w-full px-4 py-3 rounded-lg border ${errors.area ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.area && (
                <p className="mt-1 text-sm text-red-500">{errors.area}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Amenities*
              </label>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {amenitiesList.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={amenity}
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleCheckboxChange(amenity)}
                      className="w-4 h-4 border-gray-300 rounded text-black-600"
                    />
                    <span className="text-sm text-indigo-700">{amenity}</span>
                  </label>
                ))}
              </div>
              {errors.amenities && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.amenities}
                </p>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload Photos*
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
              />
              {errors.photos && (
                <p className="mt-1 text-sm text-red-500">{errors.photos}</p>
              )}
            </div>

            {/* Photo Previews */}
            {formData.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Property Photo ${index + 1}`}
                      className="object-cover w-full h-32 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handlePhotoDelete(index)}
                      className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600 focus:outline-none"
                      aria-label={`Delete photo ${index + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Click on the map to add a pin.
              </label>
              <div className="h-96">
                <MapInput onCoordinatesSelect={updateCoordinates} />
              </div>
              {errors.coordinates && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.coordinates}
                </p>
              )}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            {/* Price */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Price (per month)*
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  min="100"
                  placeholder="e.g., 1200"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.price ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            {/* Security Deposit */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Security Deposit Amount*
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="number"
                  value={formData.deposit}
                  onChange={(e) =>
                    setFormData({ ...formData, deposit: e.target.value })
                  }
                  min="100"
                  placeholder="e.g., 1200"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${errors.deposit ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>
              {errors.deposit && (
                <p className="mt-1 text-sm text-red-500">{errors.deposit}</p>
              )}
            </div>

            {/* Minimum Stay */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Minimum Stay (months)*
              </label>
              <input
                type="number"
                value={formData.minimumStay}
                onChange={(e) =>
                  setFormData({ ...formData, minimumStay: e.target.value })
                }
                min="1"
                placeholder="e.g., 6"
                className={`w-full px-4 py-3 rounded-lg border ${errors.minimumStay ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.minimumStay && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.minimumStay}
                </p>
              )}
            </div>

            {/* Bills Included */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.billsIncluded}
                onChange={() =>
                  setFormData({
                    ...formData,
                    billsIncluded: !formData.billsIncluded,
                  })
                }
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
              />
              <label className="block ml-2 text-sm text-gray-700">
                Bills Included
              </label>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            {/* Contact Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Contact Name*
              </label>
              <input
                type="text"
                value={formData.contactName}
                onChange={(e) =>
                  setFormData({ ...formData, contactName: e.target.value })
                }
                placeholder="Enter your name"
                className={`w-full px-4 py-3 rounded-lg border ${errors.contactName ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.contactName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.contactName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email*
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number*
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="Enter your phone number"
                className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Available From */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Available From*
              </label>
              <input
                type="date"
                value={formData.availableFrom}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableFrom: e.target.value,
                  })
                }
                className={`w-full px-4 py-3 rounded-lg border ${errors.availableFrom ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.availableFrom && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.availableFrom}
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />

      {/* Multi-Step Form */}
      <div className="min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
        <div className="max-w-3xl p-8 mx-auto bg-white border border-gray-100 shadow-lg rounded-2xl">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center justify-center w-6 h-6 font-medium text-white bg-indigo-600 rounded-full">
                {currentStep}
              </span>
              <span>of 7</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {[
                'Location',
                'Property Details',
                'Amenities',
                'Photos',
                'Location',
                'Pricing',
                'Contact',
              ][currentStep - 1]}
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            <div
              className={`transition-all duration-500 ease-in-out ${currentStep === 1
                ? 'max-h-full opacity-100'
                : 'max-h-0 overflow-hidden opacity-0'
                }`}
            >
              {currentStep === 1 && renderStep()}
            </div>

            <div
              className={`transition-all duration-500 ease-in-out ${currentStep === 2
                ? 'max-h-full opacity-100'
                : 'max-h-0 overflow-hidden opacity-0'
                }`}
            >
              {currentStep === 2 && renderStep()}
            </div>

            <div
              className={`transition-all duration-500 ease-in-out ${currentStep === 3
                ? 'max-h-full opacity-100'
                : 'max-h-0 overflow-hidden opacity-0'
                }`}
            >
              {currentStep === 3 && renderStep()}
            </div>

            <div
              className={`transition-all duration-500 ease-in-out ${currentStep === 4
                ? 'max-h-full opacity-100'
                : 'max-h-0 overflow-hidden opacity-0'
                }`}
            >
              {currentStep === 4 && renderStep()}
            </div>

            <div
              className={`transition-all duration-500 ease-in-out ${currentStep === 5
                ? 'max-h-full opacity-100'
                : 'max-h-0 overflow-hidden opacity-0'
                }`}
            >
              {currentStep === 5 && renderStep()}
            </div>

            <div
              className={`transition-all duration-500 ease-in-out ${currentStep === 6
                ? 'max-h-full opacity-100'
                : 'max-h-0 overflow-hidden opacity-0'
                }`}
            >
              {currentStep === 6 && renderStep()}
            </div>

            <div
              className={`transition-all duration-500 ease-in-out ${currentStep === 7
                ? 'max-h-full opacity-100'
                : 'max-h-0 overflow-hidden opacity-0'
                }`}
            >
              {currentStep === 7 && renderStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={loading}
                  className="flex items-center px-6 py-3 font-medium text-gray-800 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <ChevronRight className="mr-2 transform -rotate-180" />
                  Back
                </button>
              )}

              <button
                type='button'
                onClick={currentStep === 7 ? handleSubmit : handleNext}
                disabled={loading && currentStep === 7}
                className={`flex items-center px-6 py-3 rounded-lg ${loading && currentStep === 7
                  ? 'bg-gray-400'
                  : 'bg-indigo-600 hover:bg-indigo-700'
                  } text-white transition-colors font-medium ${currentStep < 7 ? 'ml-auto' : ''
                  }`}
              >
                {currentStep === 7 ? (
                  loading ? 'Submitting...' : 'Submit Listing'
                ) : (
                  <>
                    Next
                    <ChevronRight className="ml-2" />
                  </>
                )}
              </button>

            </div>

            {/* Submission Error */}
            {errors.submit && (
              <div className="mt-4 text-sm text-red-500">
                {errors.submit}
              </div>
            )}
          </form>
        </div>
        {/* Features Grid */}
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Link
                key={index}
                to="#"
                className="p-6 transition-all bg-white border border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-lg"
              >
                <div className="inline-block p-3 mb-4 text-indigo-600 rounded-lg bg-indigo-50">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
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