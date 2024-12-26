const FeaturedUnis = () => {
  const cities = [
    { name: "UOM", image: "path/to/uom.jpg" },
    { name: "UOR", image: "path/to/uor.jpg" },
    { name: "UOC", image: "path/to/uoc.jpg" },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <h2 className="text-center text-4xl font-bold mb-8">Find Your Perfect Home, Right Next to Campus</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {cities.map((city) => (
          <div
            key={city.name}
            className="relative bg-cover bg-center rounded-lg h-64"
            style={{ backgroundImage: `url(${city.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <h3 className="text-white text-2xl font-bold">{city.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedUnis;
