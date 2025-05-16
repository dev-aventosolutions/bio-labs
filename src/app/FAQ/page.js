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
    <div className="min-h-screen bg-white dark:bg-white md:px-12">
      <SectionWrapper padding="md:py-12 py-4">
        <div className="flex flex-col md:flex-row">
          {/* Left Side */}
          <div className="w-full md:w-1/14 pr-0 md:pr-0 mb-4 md:mb-0">
          <div className="flex flex-col top-27 sticky items-start">
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
  <div className="bg-white p-0 md:px-8 ">
    {faqs.map((faq) => (
      <div
        key={faq.id}
        className="border-b border-gray-100 py-8" 
      >
        <hp className="text-[16px] font-medium text-[#292929] mb-1">
          {faq.question}
        </hp>
        <p className="text-[#8d8f9a] text-[12px] font-normal ps-6">
          {faq.answer}
        </p>
      </div>
    ))}
  </div>
</div>

        </div>
      </SectionWrapper>
    </div>
  );
}
