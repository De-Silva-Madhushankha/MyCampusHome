import React, { useState } from "react";
import { Wifi, WashingMachine, Wind, MonitorSmartphone, Bath, ChefHat, Car, Tv, TreePine } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom marker icon setup
const customIcon = L.icon({
  iconUrl: 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const AmenityIcon = ({ Icon, text }) => (
  <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
    <Icon className="w-5 h-5 text-gray-600" />
    <span className="text-gray-700">{text}</span>
  </div>
);

const HouseDetails = () => {
  const [showMap, setShowMap] = useState(false);
  const position = [7.8774, 80.6518]; // add the latitude and longitude of the property
  const amenities = [
    { icon: Wifi, text: "Wi-Fi" },
    { icon: WashingMachine, text: "Washing Machine" },
    { icon: Wind, text: "Air Conditioning" },
    { icon: MonitorSmartphone, text: "Study Desk" },
    { icon: Bath, text: "Attached Bathroom" },
    { icon: ChefHat, text: "Kitchen Access" },
    { icon: Car, text: "Parking" },
    { icon: Tv, text: "TV" },
    { icon: TreePine, text: "Garden" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* About This House Section */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">About This House</h1>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Located in Kandalama, this welcoming villa lets you experience it all. With convenient onsite parking,
            you'll be ready to make the 13-minute drive to Dambulla Cave Temple or the 16-minute drive to Sigiriya Museum.
          </p>
          <p>
            After you return, you can unwind in the garden or sip a drink on the terrace. As for the great indoors,
            you can come inside and enjoy the free WiFi and flat-screen TV.
          </p>
          <p>
            This 1-bedroom, 1-bathroom rental features a sitting area, a dining area, air conditioning, and a desk.
            Bathroom amenities include free toiletries, towels, and a hair dryer. For your convenience, there's a
            coffee maker and an electric kettle.
          </p>
        </div>
      </div>

      {/* Map View and Amenities Section */}
      <div className="mb-12 flex justify-between items-start">
        {/* Left Column: Amenities */}
        <div className="w-full md:w-1/2 pr-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {amenities.map((amenity, index) => (
              <AmenityIcon
                key={index}
                Icon={amenity.icon}
                text={amenity.text}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Location</h2>
          {!showMap ? (
            <div className="relative">
              <img
                src="/MapImgSample.png"
                alt="Map of the property"
                className="w-full h-auto rounded-lg filter blur-sm"
              />
              <button
                onClick={() => setShowMap(true)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-6 rounded-full shadow-lg font-bold hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 hover:shadow-xl transition-all duration-300"
              >
                Show this property on the map
              </button>
            </div>
          ) : (
            <div
              className="relative rounded-lg overflow-hidden"
              style={{
                height: '500px', // Adjust the height as needed
                zIndex: "1" // Lower z-index for map container
              }}
            >
              <MapContainer
                center={position} // add the latitude and longitude of the property
                zoom={20}
                scrollWheelZoom={true} // Enable zoom with touchpad or scroll wheel
                className="h-full w-full"
              >
                <TileLayer
                  url="https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=NyAnmJNQJ1ocTyQvNNtO"
                  tileSize={512}
                  zoomOffset={-1}
                  attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />
                <Marker
                  position={position}
                  icon={customIcon}
                />
              </MapContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HouseDetails;
