const Hero = () => {
    return (
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-screen flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Campus life starts with the perfect home</h1>
        <div className="bg-white p-2 rounded-md flex w-full md:w-1/2">
          <button className="px-4 py-2 bg-purple-500 text-white rounded-l-md">Rent</button>
          <button className="px-4 py-2 text-gray-600">Buy</button>
          <input
            type="text"
            placeholder="Enter city, address, or ZIP"
            className="flex-grow px-4 py-2 outline-none"
          />
        </div>
      </div>
    );
  };

export default Hero;
  