import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Hero from "../components/Hero";

const ScheduleTour = () => {
  return (

    <>
    <Navbar />
    <Hero />
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-16 text-center text-4xl font-bold text-gray-800">Online Tour Scheduling</h1>

      <div className="grid gap-16 md:grid-cols-2">
        {/* Pick a Date and Time Section */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-8 w-64 rounded-lg border p-4 shadow-lg">
            <div className="mb-4 grid grid-cols-4 gap-2">
              {["25", "26", "27", "28"].map((day) => (
                <div key={day} className="flex aspect-square items-center justify-center rounded border text-sm">
                  {day}
                </div>
              ))}
            </div>
            <button className="w-full rounded-md bg-purple-600 py-2 text-white hover:bg-purple-700 transition">
              Send Request
            </button>
          </div>
          <h2 className="mb-4 text-2xl font-bold">Pick a Date and Time</h2>
          <p className="text-center text-gray-600 md:text-left">
            Arrange a tour in a few clicks, just pick a date and time that suits you. We'll notify your landlord and help you both synchronize your schedules.
          </p>
        </div>

        {/* Stay Informed Section */}
        <div className="flex flex-col items-center md:items-start">
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
          <h2 className="mb-4 text-2xl font-bold">Stay Informed</h2>
          <p className="text-center text-gray-600 md:text-left">
            You'll never forget about upcoming tours with Rentberry. Our email notifications and texts will keep you informed throughout the whole process.
          </p>
        </div>
      </div>

      {/* Need More Information Section */}
      <div className="mt-16 text-center">
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
    <SearchBar/>
    <Footer />
    </>
  );
};

export default ScheduleTour;

