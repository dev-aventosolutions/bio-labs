"use client";

import { useEffect, useState } from "react";
import { fetchFAQs } from "../lib/airtable";
import Image from "next/image";
import SectionWrapper from "../components/SectionWrapper";
import logo from "../../../public/lablogo.png"; 

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchFAQs().then(setFaqs).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-white">
      <SectionWrapper padding="py-12">
        <div className="flex flex-col md:flex-row">
          {/* Left Side */}
          <div className="w-full md:w-1/9 pr-0 md:pr-0 mb-8 md:mb-0">
            <div className="flex flex-col top-26 sticky items-center md:items-start">
              {/* Logo Image */}
              <Image
                src={logo}
                alt="LabSpaces Logo"
                width={70}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-4/5">
            <div className="bg-white p-0 md:p-8">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="mb-8 pb-6 border-b border-gray-200"
                >
                  <h3 className="text-[20px] font-medium text-[#292929] mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-[#8d8f9a] text-[16px] font-normal ps-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
