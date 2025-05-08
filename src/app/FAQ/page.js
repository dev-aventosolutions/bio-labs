"use client";

import Link from "next/link";
import { useTranslation } from "../lib/translate"; // adjust the path as needed

export default function FAQPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white dark:bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row">
          {/* Left Side */}
          <div className="w-full md:w-1/5 pr-0 md:pr-8 mb-8 md:mb-0">
            <div className="sticky top-24">
              <div className="text-4xl font-bold text-[#696A78] mb-4">
                {t("faqPage.bioList")}
              </div>
              <div className="text-5xl font-bold text-blue-600">
                {t("faqPage.faq")}
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-4/5">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {[
                "whatIsThis",
                "why",
                "howSelected",
                "who",
                "howOften",
                "suggest",
                "ranked",
                "contact",
              ].map((key) => (
                <div
                  key={key}
                  className="mb-8 pb-6 border-b border-gray-200"
                >
                  <h3 className="text-2xl font-semibold text-[#696A78] mb-3">
                    {t(`faqPage.${key}.question`)}
                  </h3>
                  <p className="text-[#696A78]">{t(`faqPage.${key}.answer`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
