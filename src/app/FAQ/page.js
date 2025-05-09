"use client";

import { useEffect, useState } from "react";
import { fetchFAQs } from "../lib/airtable"; // adjust path if needed

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchFAQs().then(setFaqs).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row">
          {/* Left Side */}
          <div className="w-full md:w-1/5 pr-0 md:pr-8 mb-8 md:mb-0">
            <div className="sticky top-24">
              <div className="text-4xl font-bold text-[#696A78] mb-4">
                BioList
              </div>
              <div className="text-5xl font-bold text-blue-600">
                FAQ
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-4/5">
            <div className="bg-white p-8">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="mb-8 pb-6 border-b border-gray-200"
                >
                  <h3 className="text-2xl font-semibold text-[#696A78] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-[#696A78]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
