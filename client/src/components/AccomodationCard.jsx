const AccommodationCard = ({ title, location, price, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600">{location}</p>
        <p className="text-blue-500 font-semibold mt-2">${price}/month</p>
      </div>
    </div>
  );
};

export default AccommodationCard;
