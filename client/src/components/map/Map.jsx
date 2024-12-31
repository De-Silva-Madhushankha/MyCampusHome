import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PopupContent from './PopupContent';

const Map = ({ properties, selectedProperty, onPropertySelect, onBoundsChange }) => {
  const mapRef = useRef();

  // Effect to handle selected property focus
  useEffect(() => {
    if (selectedProperty && mapRef.current) {
      mapRef.current.setView(
        [selectedProperty.mapPosition.lat, selectedProperty.mapPosition.lng],
        20
      );
    }
  }, [selectedProperty]);

  // Custom component to handle bounds change
  const MapEvents = () => {
    const map = useMapEvents({
      moveend: () => {
        const bounds = map.getBounds();
        onBoundsChange(bounds);
      },
    });
    return null;
  };

  return (
    <div className="relative h-full min-h-[500px] bg-gray-100 rounded-lg overflow-hidden">
      <MapContainer
        center={[6.7951, 79.9009]} // Default center (Moratuwa example)
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        {/* Tile Layer (Map Background) */}
        <TileLayer
          url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=NyAnmJNQJ1ocTyQvNNtO"
          tileSize={512} // Set to 512 if your tiles are 512x512
          zoomOffset={-1} // Adjust for 512x512 tiles
          attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />

        {/* Property Markers */}
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.mapPosition.lat, property.mapPosition.lng]}
            eventHandlers={{
              click: () => onPropertySelect(property),
            }}
            icon={L.divIcon({
              html: `
                <div class="relative group">
                  <div class="absolute -translate-x-1/2 -translate-y-full mb-2 bg-indigo-600 text-white px-3 py-1 rounded-lg shadow-lg" style="min-width: 90px; max-width: 150px; display: inline-block;">
                    <span class="font-semibold">LKR ${property.price.toLocaleString()}</span>
                    <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-600 rotate-45"></div>
                  </div>
                </div>`,
              className: "custom-icon", // Avoid default marker styles
              iconSize: [0, 0], // Ensures no extra padding around the marker
              popupAnchor: [0, -20], // Adjust popup position relative to the marker
            })}
          >
            <Popup>
              <PopupContent property={property} />
            </Popup>
          </Marker>
        ))}

        {/* Handle map bounds changes */}
        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default Map;
