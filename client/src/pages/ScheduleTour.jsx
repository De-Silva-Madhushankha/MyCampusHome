import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Hero from "../components/Hero";
import { ChevronLeft, ChevronRight, House } from "lucide-react";

const ScheduleTour = () => {
  return (

    <>
      <Navbar />
      <Hero />
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 lg:px-20">

          {/* Pick a Date and Time Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative flex justify-center">
              <div className='w-52 bg-white shadow-xl rounded-lg text-center'>
                <div className="flex justify-center items-center pt-4 mb-4">
                  <House className="text-gray-500" />
                  <span className="ml-2 text-sm font-medium text-gray-500">Tour Date</span>
                </div>
                <hr className="border-gray-200 my-4" />
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <ChevronLeft className={'text-gray-500'} />
                  <div className="px-4 py-2 border rounded-lg">
                    <p className="text-sm font-medium">Mon</p>
                    <p className="text-lg font-bold">24</p>
                    <p className="text-sm text-gray-500">Dec</p>
                  </div>
                  <ChevronRight className={'text-gray-500'} />
                </div>
                <div className="bg-purple-600 text-white font-bold py-4 rounded-b-lg">
                  Schedule Tour
                </div>
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-2xl font-bold">Pick a Date and Time</h2>
              <p className="text-center text-gray-600 md:text-left">
                Arrange a tour in a few clicks just pick a date and time that suits you. We’ll notify your landlord and help you both synchronize your schedules. Once confirmed, you’ll receive a reminder before the tour.
              </p>
            </div>
          </div>

          {/* Stay Informed Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-10">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Stay Informed</h2>
              <p className="text-center text-gray-600 md:text-left">
                You'll never forget about upcoming tours with MyCampusHome. Our email notifications and texts will keep you informed throughout the whole process. You can also add the tour to your calendar for better planning.
              </p>
            </div>
            <div className="relative flex justify-center">
              <div className="mb-8 w-64 rounded-lg border p-4 shadow-lg">
                <div className="mb-4 rounded-lg bg-green-50 p-3">
                  <p className="text-green-800">Your Request Has Been Accepted</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-red-100" />
                    <span>Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-blue-100" />
                    <span>Calendar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Need More Information Section */}
          <div className="mt-5 text-center">
            <h3 className="mb-4 text-xl font-semibold">Need More Information?</h3>
            <div className="space-y-2">
              <a href="#" className="block text-purple-600 hover:underline">
                How to Schedule a Property Tour
              </a>
              <a href="#" className="block text-purple-600 hover:underline">
                How to Apply for a Rental
              </a>
              <a href="#" className="block text-purple-600 hover:underline">
                How Custom Offers Work
              </a>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </>
  );
};

export default ScheduleTour;

