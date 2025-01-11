import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';
import { toast } from 'react-toastify';

// Define marker icon
const defaultIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Search control component
const SearchField = ({ onSearchResult }) => {
    const map = useMap();

    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        const searchControl = new GeoSearchControl({
            provider,
            style: 'bar',
            showMarker: false,
            showPopup: false,
            retainZoomLevel: true,
            animateZoom: true,
            searchLabel: 'Search for a location...',
            keepResult: true,
        });

        map.addControl(searchControl);

        // Handle search results
        map.on('geosearch/showlocation', (result) => {
            if (result?.location?.lat && result?.location?.lng) {
                const { lat, lng } = result.location;
                map.setView([lat, lng], 13); // Set zoom level to 13 for better clarity
                if (onSearchResult) {
                    onSearchResult([lat, lng]);
                }
            } else {
                toast.error('Invalid search result location');
            }
        });


        return () => {
            map.removeControl(searchControl);
        };
    }, [map, onSearchResult]);

    return null;
};

// Click handler component
const LocationMarker = ({ onPositionSelect, markerPosition }) => {
    const map = useMap();

    useEffect(() => {
        const handleClick = (e) => {
            const { lat, lng } = e.latlng;
            onPositionSelect([lat, lng]);
        };

        map.on('click', handleClick);

        return () => {
            map.off('click', handleClick);
        };
    }, [map, onPositionSelect]);

    return markerPosition ? (
        <Marker position={markerPosition} icon={defaultIcon} />
    ) : null;
};

const MapInput = ({ onCoordinatesSelect }) => {
    const [markerPosition, setMarkerPosition] = useState(null);

    const handlePositionSelect = (position) => {
        setMarkerPosition(position);
        onCoordinatesSelect({
            lat: position[0],
            lng: position[1]
        });
    };

    const handleSearchResult = (position) => {
        // Clear existing marker when a new location is searched
        setMarkerPosition(null);
    };

    return (
        <div className="w-full h-96 relative">
            <MapContainer
                center={[6.9271, 79.8612]}
                zoom={13}
                className="w-full h-full"
            >
                <TileLayer
                    url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=NyAnmJNQJ1ocTyQvNNtO"
                    tileSize={512}
                    zoomOffset={-1}
                    attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />
                <SearchField onSearchResult={handleSearchResult} />
                <LocationMarker
                    onPositionSelect={handlePositionSelect}
                    markerPosition={markerPosition}
                />
            </MapContainer>
        </div>
    );
};

export default MapInput;