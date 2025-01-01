import React, { useState } from 'react';
import { Box, Typography, Grid2 as Grid, Button } from '@mui/material';

const AccommodationGallery = () => {
    const [showAllImages, setShowAllImages] = useState(false);

    const images = [
        [
            "https://www.shutterstock.com/image-photo/portrait-tourist-woman-standing-nearly-600nw-1494850982.jpg",
            "https://www.shutterstock.com/image-photo/young-woman-traveler-opening-curtains-600nw-2159847275.jpg",
            "https://www.shutterstock.com/image-photo/young-couple-traveler-opening-curtains-600nw-2300589961.jpg"
        ],
        [
            "https://thumbs.dreamstime.com/b/hotel-room-27254386.jpg",
            "https://thumbs.dreamstime.com/b/generated-image-happy-adult-woman-glasses-suitcase-tickets-standing-near-big-bed-hotel-room-travel-concept-335663711.jpg",
            "https://thumbs.dreamstime.com/b/woman-backpacker-traveler-stay-high-quality-hotel-room-79288812.jpg"
        ]
    ];

    return (
        <Box className="p-5 max-w-5xl mx-auto">
            <div className="space-y-4">
                {/* First row - always visible */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {images[0].map((src, index) => (
                        <div
                            key={index}
                            className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
                            <img
                                src={src}
                                alt={`Property image ${index + 1}`}
                                className="object-cover w-full h-full transform transition-transform duration-300 ease-out group-hover:scale-110"
                                style={{ maxHeight: '250px' }}
                            />
                        </div>
                    ))}
                </div>

                {/* Additional rows - shown when showAllImages is true */}
                {showAllImages && (
                    <div className="space-y-4">
                        {images.slice(1).map((row, rowIndex) => (
                            <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {row.map((src, imgIndex) => (
                                    <div
                                        key={imgIndex}
                                        className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer"
                                    >
                                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
                                        <img
                                            src={src}
                                            alt={`Property image ${rowIndex * 3 + imgIndex + 4}`}
                                            className="object-cover w-full h-full transform transition-transform duration-300 ease-out group-hover:scale-110"
                                            style={{ maxHeight: '250px' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}

                {/* See More button */}
                {!showAllImages && images.length > 1 && (
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setShowAllImages(true)}
                            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors duration-300 font-medium"
                        >
                            See More Images
                        </button>
                    </div>
                )}
            </div>
        </Box>
    );
};

export default AccommodationGallery;