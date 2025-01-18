import React from 'react';

const PropertyListing = () => {
  // Mock property data
  const properties = [
    {
      id: 1,
      title: 'Cozy Apartment in Colombo',
      location: 'Colombo, Sri Lanka',
      price: '$500/month',
      image: 'https://via.placeholder.com/400x250',
      status: 'Available',
    },
    {
      id: 2,
      title: 'Spacious House in Kandy',
      location: 'Kandy, Sri Lanka',
      price: '$1200/month',
      image: 'https://via.placeholder.com/400x250',
      status: 'Occupied',
    },
    // Add more properties as needed
  ];

  return (
    <>
    <div className="grid flex-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {properties.map((property) => (
        <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
            <p className="text-gray-600 mt-1">{property.location}</p>
            <p className="text-indigo-600 font-semibold mt-2">{property.price}</p>
            <span
              className={`inline-block mt-4 px-3 py-1 text-xs font-semibold rounded-full ${
                property.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {property.status}
            </span>
          </div>
        </div>
      ))}
    </div></>
    
  );
};

export default PropertyListing;