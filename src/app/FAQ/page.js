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
          {/* Left Side - Logo + FAQ Title */}
          <div className="md:w-[200px] flex-shrink-0 mb-6 md:mb-0">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center gap-4">
              <Image
                src={logo}
                alt="LabSpaces Logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <p className="text-2xl font-bold text-black">FAQ</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden md:flex items-center gap-4 sticky top-6">
              <Image
                src={logo}
                alt="LabSpaces Logo"
                width={80}
                height={80}
                className="object-contain"
              />
              <p className="text-[40px] font-bold text-black">FAQ</p>
            </div>
          </div>

          {/* Right Side - Questions */}
          <div className="flex-1 md:pl-8">
            <div className="bg-white">
              {faqs.map((faq) => (
                <div key={faq.id} className="border-b border-gray-100 py-8">
                  <p className="text-[19px] font-medium text-black leading-[28px] mb-1">
                    {faq.question}
                  </p>
                  <p className="text-[#686A78] leading-[24px] ps-6">
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