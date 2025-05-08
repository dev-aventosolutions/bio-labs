// components/Navbar.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/translate";
import SectionWrapper from "../SectionWrapper";

const languages = [
  {
    code: "fr",
    name: "Français",
    flag: "https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/fr.svg",
  },
  {
    code: "en",
    name: "English",
    flag: "https://cdn.jsdelivr.net/npm/flag-icon-css@3.5.0/flags/4x3/gb.svg",
  },
];

export default function Navbar() {
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const currentLanguageObj =
    languages.find((lang) => lang.code === language) || languages[0];

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setLanguageDropdownOpen(false);
  };

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-200 bg-white dark:bg-white">
      <SectionWrapper
        padding="md:py-1 py-1"
        className="flex justify-between items-center"
      >
        <div className="flex space-x-6 items-center">
          <Link
            href="/"
            className="text-gray-600 dark:text-gray-600 hover:text-gray-800 border-l border-r border-gray-200 px-4  my-1"
          >
            {t("navbar.links")}
          </Link>
          <Link
            href="/FAQ"
            className="text-gray-600 dark:text-gray-600 hover:text-gray-800 border-r border-gray-200 pr-4  my-1"
          >
            {t("navbar.faq")}
          </Link>
        </div>

        <div className="relative">
          <button
            className="flex items-center space-x-2 text-sm"
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            aria-label="Change language"
            aria-expanded={languageDropdownOpen}
          >
            <Image
              src={currentLanguageObj.flag}
              width={24}
              height={16}
              alt={currentLanguageObj.name}
              className="rounded-sm"
              priority
            />
            <span className="text-gray-700 dark:text-gray-700">
              {currentLanguageObj.code.toUpperCase()}
            </span>
          </button>

          {languageDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-white border border-gray-200 dark:border-gray-200 rounded-md shadow-lg z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-800 dark:text-gray-800"
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <Image
                    src={lang.flag}
                    width={24}
                    height={16}
                    alt={lang.name}
                    className="rounded-sm"
                  />
                  <span className="text-gray-800 dark:text-gray-800">
                    {lang.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </SectionWrapper>
    </header>
  );
}
