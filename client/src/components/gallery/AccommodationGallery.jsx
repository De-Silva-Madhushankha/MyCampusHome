import React, { useState } from 'react';

const AccommodationGallery = ({ photos = [] }) => {
  const [showAllImages, setShowAllImages] = useState(false);

  // Calculate initial and remaining images
  const initialImages = photos?.slice(0, 3) || [];
  const remainingImages = photos?.slice(3) || [];
  const hasMoreImages = remainingImages.length > 0;

  return (
    <div className="max-w-5xl mx-auto p-4 -mt-16">
      <div className="space-y-4">
        {/* Initial images (up to 3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {initialImages.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer"
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10" />
              <img
                src={src}
                alt={`Property image ${index + 1}`}
                className="object-cover w-full h-full transform transition-transform duration-300 ease-out group-hover:scale-110"
              />
            </div>
          ))}
          
          {/* Add placeholder divs if less than 3 images */}
          {initialImages.length < 3 && 
            [...Array(3 - initialImages.length)].map((_, index) => (
              <div 
                key={`placeholder-${index}`} 
                className="aspect-[4/3] rounded-lg bg-gray-100"
              />
            ))
          }
        </div>

        {/* Additional images - shown when showAllImages is true */}
        {showAllImages && hasMoreImages && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {remainingImages.map((src, index) => (
              <div
                key={`additional-${index}`}
                className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer"
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10" />
                <img
                  src={src}
                  alt={`Property image ${index + 4}`}
                  className="object-cover w-full h-full transform transition-transform duration-300 ease-out group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        )}

        {/* See More button - only shown if there are more images */}
        {!showAllImages && hasMoreImages && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAllImages(true)}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors duration-300 font-medium"
            >
              See More Images ({remainingImages.length} more)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccommodationGallery;