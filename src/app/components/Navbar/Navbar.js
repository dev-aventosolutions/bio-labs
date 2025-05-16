"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SectionWrapper from "../SectionWrapper";
import { useLanguage } from "../../lib/LanguageContext";
import { useTranslation } from "../../lib/translate";
import { ChevronDown } from "../Icons";
import { Listbox } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

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
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const pathname = usePathname();

  const currentLanguageObj =
    languages.find((lang) => lang.code === language) || languages[0];

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <SectionWrapper
        padding="py-1"
        className="flex justify-between items-center"
      >
        {/* Links */}
        <div className="flex items-center">
          <Link
            href="/"
            className={`inline-flex items-center px-4 py-1 text-black text-[13px] hover:bg-gray-50 border-l border-r border-gray-200  ${
              pathname === "/" ? "font-bold text-black" : ""
            }`}
          >
            {t("navbar.links")}
          </Link>

          <Link
            href="/FAQ"
            className={`inline-flex items-center px-4 py-1 text-black text-[13px] hover:bg-gray-50 border-r border-gray-200 ${
              pathname === "/FAQ" ? "font-bold text-black" : ""
            }`}
          >
            {t("navbar.faq")}
          </Link>
        </div>

        {/* Language Dropdown */}
        <Listbox value={language} onChange={setLanguage}>
          {({ open }) => (
            <div className="relative w-[70px] text-sm font-normal cursor-pointer">
              <Listbox.Button className="flex items-center justify-between w-full relative outline-none cursor-pointer">
                <div className="flex items-center gap-2">
                  <Image
                    src={currentLanguageObj.flag}
                    alt={currentLanguageObj.code}
                    width={20}
                    height={20}
                    className=""
                  />
                  <span className="text-sm text-[#1D0129] font-medium">
                    {currentLanguageObj.code.toUpperCase()}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-[#1D0129]" />
                </motion.div>
              </Listbox.Button>

              <AnimatePresence>
                {open && (
                  <Listbox.Options
                    as={motion.ul}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-1 mt-2 w-32 max-w-[90vw] bg-white shadow z-50 overflow-hidden outline-none"
                  >
                    {languages.map((lang) => (
                      <Listbox.Option
                        key={lang.code}
                        value={lang.code}
                        className={({ active }) =>
                          `flex items-center gap-2 px-4 py-2 cursor-pointer text-sm ${
                            active ? "bg-gray-100" : ""
                          }`
                        }
                      >
                        <Image
                          src={lang.flag}
                          alt={lang.code}
                          width={20}
                          height={20}
                          className=""
                        />
                        <span className="text-[#1D0129]">{lang.name}</span>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                )}
              </AnimatePresence>
            </div>
          )}
        </Listbox>
      </SectionWrapper>
    </header>
  );
}
