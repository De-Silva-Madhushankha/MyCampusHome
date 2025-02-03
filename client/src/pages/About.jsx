import { Mail, Phone, Download } from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AboutContactPage = () => {
  return (
    <>
    <Navbar />
    <div className="bg-gray-100 text-gray-800">
      {/* About Us */}
      <section className="text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Rentberry is a transparent and secure home rental platform that connects tenants and landlords.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <div className="w-64 h-40 bg-gray-300 flex items-center justify-center rounded-lg">Web Demo</div>
          <div className="w-64 h-40 bg-gray-300 flex items-center justify-center rounded-lg">App Demo</div>
          <div className="w-64 h-40 bg-gray-300 flex items-center justify-center rounded-lg">Media Reviews</div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-white text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">Our Team</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Meet the team that invented the platform! We brought together the most talented people around the globe.
        </p>
        <div className="flex gap-6 overflow-x-scroll p-6">
          <div className="w-48 h-48 bg-gray-300 rounded-lg"></div>
          <div className="w-48 h-48 bg-gray-300 rounded-lg"></div>
          <div className="w-48 h-48 bg-gray-300 rounded-lg"></div>
          <div className="w-48 h-48 bg-gray-300 rounded-lg"></div>
          <div className="w-48 h-48 bg-gray-300 rounded-lg"></div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="text-center py-16 px-4">
        <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">We're here for you 24/7. Reach out anytime!</p>
        <div className="flex justify-center gap-8 mt-8">
          <div className="flex items-center gap-2 text-lg"><Mail /> Email Us</div>
          <div className="flex items-center gap-2 text-lg"><Download /> Download Press Kit</div>
          <div className="flex items-center gap-2 text-lg"><Phone /> +1 (415) 795-7171</div>
        </div>
        <p className="mt-6 text-gray-600">201 Spear Street, Suite 1900, San Francisco, CA 94105</p>
        <div className="mt-8 w-full h-80 bg-gray-300">Google Map Placeholder</div>
      </section>
    </div>
    <Footer />
    </>
  );
};

export default AboutContactPage;
