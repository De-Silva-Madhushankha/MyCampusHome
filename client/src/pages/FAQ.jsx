import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "How do I register for an account?",
    answer:
      "Click on the 'Sign Up' button in the navigation bar and fill out the registration form with your details.",
  },
  {
    question: "How can I list my property?",
    answer:
      "Navigate to the 'List an Accommodation' page, fill out the required information, and submit your property for review.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept various payment methods including credit/debit cards, PayPal, and bank transfers.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click on the 'Forgot password?' link on the login page and follow the instructions to reset your password.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, you can cancel your booking from your account dashboard under 'My Bookings'. Please refer to our cancellation policy for more details.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h1>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left focus:outline-none flex justify-between items-center"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-indigo-600" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 py-4 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQ;