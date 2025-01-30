import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const FeatureSection = ({ title, description, imageSrc, imageAlt, imageFirst = true }) => {
    const content = (
      <div className="space-y-4 md:w-1/2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    );
  
    const image = (
      <div className="md:w-1/2">
        <img 
          src={imageSrc || "/placeholder.svg"} 
          alt={imageAlt} 
          className="w-full h-auto" 
        />
      </div>
    );
  
    return (
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {imageFirst ? (
          <>
            {image}
            {content}
          </>
        ) : (
          <>
            {content}
            {image}
          </>
        )}
      </div>
    );
  };

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
      <section className="w-full max-w-6xl mx-auto px-4 space-y-24 py-16">
        <FeatureSection
          title="Convenient Rental Payments"
          description="Paying rent is as easy as paying for your favorite coffee. Simply connect your bank, Apple Pay or Google Pay, and spend no more than a minute! We support all major payment methods and have made this feature to users from 50+ countries."
          imageSrc="/api/placeholder/400/300"
          imageAlt="Payment methods mockup"
        />

        <FeatureSection
          title="Secure Payments"
          description="Rental payments are processed with the highest security standards. We use SSL encryption with Stripe. You can rest assured that your sensitive data will never be compromised."
          imageSrc="/api/placeholder/400/300"
          imageAlt="Secure payment mockup"
          imageFirst={false}
        />

        <FeatureSection
          title="Due Date Reminders"
          description="Never pay late again thanks to our due date reminder system. Three days before your rent is due, you'll receive an email with a nudge that's time to pay. No more late fees or calls from your property management."
          imageSrc="/api/placeholder/400/300"
          imageAlt="Due date reminder mockup"
        />

        <FeatureSection
          title="Faster Transactions"
          description="No need to dig through your junk drawer to find your checkbook and wait 5-7 business days. Not only do you don't have to drive to the post office, but you can also use your credit card pay twice as life to pay, and knock this task off your to-do list in just a few seconds!"
          imageSrc="/api/placeholder/400/300"
          imageAlt="Faster transactions mockup"
          imageFirst={false}
        />

        <FeatureSection
          title="AutoPay Feature"
          description="Finally, we've created a way to make rental payments even easier for you! All you have to do is set up your payment schedule in AutoPay once, and Rentberry will take care of the rest. Your landlord will receive payments on time, every time - you don't even have to lift a finger."
          imageSrc="/api/placeholder/400/300"
          imageAlt="AutoPay feature mockup"
        />
      </section>

      <section className="w-full max-w-3xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600 text-xl">?</span>
          </div>
          <h2 className="text-2xl font-bold">Rent Payments FAQ</h2>
        </div>

          <div value="item-1">
            <h3>How to pay rent online?</h3>
            <p>
              You can pay your rent online through our secure payment platform using various payment methods including
              credit cards, bank transfers, or digital wallets.
            </p>
          </div>

          <div value="item-2">
            <h3>Is Rentberry safe for rental payments?</h3>
            <p>
              Yes, Rentberry uses bank-level security encryption and partners with trusted payment processors to ensure
              your transactions are safe and secure.
            </p>
          </div>

          <div value="item-3">
            <h3>Is it safe to pay rent in cash?</h3>
            <p>
              While cash payments are accepted, online payments provide better security and documentation of your rental
              payments.
            </p>
          </div>

          <div value="item-4">
            <h3>How much rent should you pay based on your salary?</h3>
            <p>
              A common guideline is to spend no more than 30% of your gross monthly income on rent.
            </p>
          </div>

          <div value="item-5">
            <h3>What happens if you don't pay rent?</h3>
            <p>
              Late or missed rent payments can result in late fees, negative credit reporting, and potential eviction
              proceedings.
            </p>
          </div>
      </section>
      <Footer />
    </>
  );
};

export default NegotiateRent;


