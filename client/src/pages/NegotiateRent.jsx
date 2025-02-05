import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const NegotiateRent = () => {
  return (
    <>
      <Navbar />
      <Hero txt1="Test"/>
      <section className="py-10 bg-white">
        <div className="container mx-auto px-6 lg:px-36">
          {/* Submit Your Offer Info*/}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-10">
            <div className="relative flex justify-center">
              <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-200 w-1/2 max-w-md mx-auto">
                <h4 className="font-bold text-center text-lg text-gray-900">Submit Your Offer</h4>

                <div className="mt-4">
                  <label className="block text-gray-600 text-sm">Monthly Rent</label>
                  <div className="flex items-center justify-between border px-4 py-3 rounded-full mt-1">
                    <div className="text-xl font-bold text-purple-600">-</div>
                    <span className="text-lg font-semibold">LKR 2,000</span>
                    <div className="text-xl font-bold text-purple-600">+</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Highest Offer: LKR 1,975</p>
                </div>

                <div className="mt-4">
                  <label className="block text-gray-600 text-sm">Security Deposit</label>
                  <div className="flex items-center justify-between border px-4 py-3 rounded-full mt-1">
                    <div className="text-xl font-bold text-purple-600">-</div>
                    <span className="text-lg font-semibold">LKR 3,000</span>
                    <div className="text-xl font-bold text-purple-600">+</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Highest Offer: LKR 3,000</p>
                </div>

                <div className="bg-green-500 text-white text-center w-full py-3 rounded-xl mt-6 font-semibold">
                  Submit Offer
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">
                What is a Custom Offer?
              </h3>
              <p className="mt-4 text-gray-600">
                MyCampusHome takes away limitations that typically restrict prospective
                tenants! With the custom proposal feature, you can name your price
                to the landlord based on your budget and priorities. Offer more or
                less money than requested, depending on how much you are ready to
                pay for your home.
              </p>
            </div>
          </div>

          {/* Other Prospects Offers */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-10">
            <div>
              <h3 class="text-3xl font-bold text-gray-900">See what Other Prospects Offer</h3>
              <p className="mt-4 text-gray-600">
                MyCampusHome ensures a transparent communication between tenants and landlords.
                We remove the guesswork or awkward face-to-face negotiations. Now, you can control
                the rental process by having access to crucial information that can help you secure
                the place faster.
              </p>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-gray-100 p-4 rounded-xl shadow-lg w-72">
                <div className="bg-white p-4 rounded-lg border-l-4 border-yellow-500 shadow-sm">
                  <h3 className="font-semibold">Applicant #1</h3>
                  <p className="text-gray-500">Rent Offer</p>
                  <p className="text-xl font-bold">LKR 1,975</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-l-4 border-green-500 shadow-sm mt-4 opacity-70">
                  <h3 className="font-semibold">Applicant #2</h3>
                  <p className="text-gray-500">Rent Offer</p>
                  <p className="text-xl font-bold">LKR 1,850</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-10">
            <div className="relative flex justify-center">
              <div className="bg-white p-4 rounded-xl shadow-lg w-72">
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <h3 className="font-semibold text-lg">Your application was approved</h3>
                  <p className="text-gray-500 text-sm">No. 464, T.B. Jaya Mawatha, Colombo 10.</p>
                  <div className="flex justify-center gap-4 text-gray-600 mt-4">
                    <span>&#128719; 1 Bed</span>
                    <span>&#128705; 1 Bath</span>
                    <span>&#128206; 935 Sq Ft</span>
                  </div>
                </div>
                <div className="w-full bg-green-500 text-center text-white font-semibold py-2 rounded-lg mt-4">Move In</div>
              </div>
            </div>
            <div className="max-w-md text-center md:text-left">
              <h2 className="text-2xl font-bold">Rent Your Dream Home</h2>
              <p className="text-gray-600 mt-2">
                Ready to apply? Great! Be careful to make a custom offer that will set you apart from the competition.
                A strong proposal will put you in the lead with your landlord. However, it’s not only a favorable price that matters.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default NegotiateRent;


