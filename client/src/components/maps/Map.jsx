import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import PopupContent from './PopupContent';

// Separate component to handle map events
const MapEvents = ({ selectedProperty, center, onViewportChanged }) => {
  const map = useMap();

  React.useEffect(() => {
    if (!map) return;
    
    const updateViewport = () => {
      const bounds = map.getBounds();
      onViewportChanged(bounds);
    };

    map.on('moveend', updateViewport);
    updateViewport(); // Initial update

    return () => {
      map.off('moveend', updateViewport);
    };
  }, [map, onViewportChanged]);

  React.useEffect(() => {
    if (map && selectedProperty) {
      map.setView(
        [selectedProperty.lat, selectedProperty.lng],
        20,
        { animate: true }
      );
    }
  }, [map, selectedProperty]);

  // Update the map when `center` changes dynamically
  React.useEffect(() => {
    if (map && center) {
      map.setView(center, 15, { animate: true });
    }
  }, [map, center]);

  return null;
};

const Map = ({ properties, selectedProperty, onPropertySelect, setFilteredProperties, setFilteredPropertiesCount }) => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat') || 0;
  const lng = searchParams.get('lng') || 0;

  const center = React.useMemo(() => [Number(lat), Number(lng)], [lat, lng]);

  const handleViewportChanged = React.useCallback(
    (bounds) => {
      if (!bounds || !Array.isArray(properties)) return;

      const filtered = properties.filter((property) => 
        bounds.contains([property.lat, property.lng])
      );

      // Batch state updates
      requestAnimationFrame(() => {
        setFilteredProperties(filtered);
        setFilteredPropertiesCount(filtered.length);
      });
    },
    [properties, setFilteredProperties, setFilteredPropertiesCount]
  );

  const markerIcon = React.useMemo(() => 
    L.icon({
      iconUrl: 'location.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    }), 
  []);

  const createPropertyIcon = React.useCallback((price) => 
    L.divIcon({
      html: `
        <div class="relative">
          <div class="absolute -translate-x-1/2 -translate-y-full mb-2 bg-indigo-600 text-white px-3 py-1 rounded-lg shadow-lg">
            <span class="font-semibold">LKR ${price.toLocaleString()}</span>
            <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-600 rotate-45"></div>
          </div>
        </div>`,
      className: "property-marker",
      iconSize: [0, 0]
    }),
  []);

  return (
    <div className="relative h-full min-h-[500px] bg-gray-100 rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        whenCreated={(map) => {
          map.setView(center, 15);
        }}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=NyAnmJNQJ1ocTyQvNNtO"
          tileSize={512}
          zoomOffset={-1}
          attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />

        {Array.isArray(properties) && properties.map((property) => (
          <Marker
            key={property._id}
            position={[property.lat, property.lng]}
            icon={createPropertyIcon(property.price)}
            eventHandlers={{
              click: () => {
                requestAnimationFrame(() => {
                  onPropertySelect(property);
                });
              }
            }}
          >
            <Popup>
              <PopupContent property={property} />
            </Popup>
          </Marker>
        ))}

        <Marker position={center} icon={markerIcon} />
        
        <MapEvents
          selectedProperty={selectedProperty}
          center={center}
          onViewportChanged={handleViewportChanged}
        />
      </MapContainer>
    </div>
  );
};

export default Map;