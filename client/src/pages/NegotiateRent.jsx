import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";



const NegotiateRent = () => {
  return (
    <>
      <Navbar />
      <Hero />

      <section className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-3xl font-bold text-gray-900">
            What is a Custom Offer?
          </h3>
          <p className="mt-4 text-gray-600">
            Rentberry takes away limitations that typically restrict prospective
            tenants! With the custom proposal feature, you can name your price
            to the landlord based on your budget and priorities. Offer more or
            less money than requested, depending on how much you are ready to
            pay for your home.
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-md border border-gray-200">
          <h4 className="font-bold text-lg text-gray-900">Submit Your Offer</h4>
          <input
            type="number"
            placeholder="$2,000"
            className="w-full p-3 border rounded mt-4"
          />
          <input
            type="number"
            placeholder="$3,000"
            className="w-full p-3 border rounded mt-4"
          />
          <button className="bg-green-500 text-white w-full py-3 rounded mt-6">
            Submit Offer
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default NegotiateRent;


