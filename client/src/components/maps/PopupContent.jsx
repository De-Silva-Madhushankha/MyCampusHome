const PopupContent = ({ property }) => {
    return (
        <div className="w-64">
            <div className="flex flex-col items-start bg-white">
                <img
                    src={property.photos[0] || "https://st2.depositphotos.com/1015412/8130/i/450/depositphotos_81301130-stock-photo-new-apartment-complex-in-suburban.jpg"}
                    alt="Property"
                    className="w-full h-32 object-cover rounded-md mb-2"
                />
                <div className="text-lg font-semibold text-gray-800">
                    LKR {property.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                    {property.bedrooms || 6} Bedrooms • {property.bathrooms || 2} Baths
                </div>
                <div className="text-sm text-gray-500 mt-1">
                    {property.address}
                </div>
            </div>
        </div>
    );
}

export default PopupContent;