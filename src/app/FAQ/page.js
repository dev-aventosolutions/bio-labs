"use client";

import { useEffect, useState } from "react";
import { fetchFAQs } from "../lib/airtable";
import Image from "next/image";
import SectionWrapper from "../components/SectionWrapper"; // adjust the path if needed
import funnelImg from "../../../public/funnel.png"; // fixed import

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
          <div className="w-full md:w-1/5 pr-0 md:pr-0 mb-8 md:mb-0">
            <div className="flex flex-col  top-26 sticky">
              {/* LAB with funnel as A */}
              <div className="flex items-center">
                <span className="font-black text-[30.35px]">L</span>
                <div className="relative" style={{ width: 21, height: 22.55 }}>
                  <Image
                    src={funnelImg}
                    alt="A"
                    fill
                    className="object-contain"
                    sizes="21px"
                  />
                </div>
                <span className="font-black text-[30.35px]">B</span>
              </div>
              {/* Spaces text below */}
              <span className="text-[15.85px] font-light mt-[-16px]">
                SPACES
              </span>
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
                  <h3 className="text-2xl font-semibold text-[#696A78] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-[#696A78]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
