import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const ApplyOnline = () => {
  return (
    <>
      <Navbar />
      <Hero txt1={"New Approach to"} txt2={"Application Process"} txt3={"Complete your rental application once and use it until you’re home."}/>
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          {/* Analyze Competition Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative flex justify-center">
              <div className="bg-white rounded-xl shadow-lg p-6 w-80 border border-gray-200">
                <div className="flex justify-between mb-4">
                  <div>
                    <div className="font-semibold text-gray-800">Applicant #1</div>
                    <div className="text-sm text-gray-500">$1,975</div>
                  </div>
                  <div className="flex gap-1 text-xl">
                    <span>👤</span>
                    <span>👤</span>
                    <span>🐕</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-20 right-0 bg-white rounded-xl shadow-lg p-4 w-48 border border-gray-200">
                <div className="text-center">
                  <div className="font-semibold text-gray-800 mb-2">Low Demand</div>
                  <div className="w-32 h-4 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full mx-auto" />
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Analyze Competition</h2>
              <p className="text-gray-600">
                Knowledge is power! Investigate your competitors' proposals and submit an offer that will set you apart.
                Your dream home is only a few steps away when you send an informed proposal and create a positive
                impression with MyCampusHome's convenient online application.
              </p>
            </div>
          </div>

          {/* Submit Your Custom Offer Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Submit Your Custom Offer</h2>
              <p className="text-gray-600">
                A competitive price is not the only key factor that landlords consider. Highlight your personal credentials
                that will impress the landlord: proof of income, references from previous landlords, and solid rental
                history. Create an extraordinary offer with MyCampusHome!
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="bg-white rounded-xl shadow-lg p-6 w-80 border border-gray-200">
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <div className="text-sm text-gray-500">Monthly Rent</div>
                      <div className="font-semibold text-gray-800">$2,000</div>
                    </div>
                    <button className="text-xl font-semibold text-gray-700">+</button>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <div className="text-sm text-gray-500">Security Deposit</div>
                      <div className="font-semibold text-gray-800">$3,000</div>
                    </div>
                    <button className="text-xl font-semibold text-gray-700">+</button>
                  </div>
                  <div className="w-full bg-green-500 text-white text-center text-lg py-3 rounded-lg">
                    Submit Offer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ApplyOnline;




