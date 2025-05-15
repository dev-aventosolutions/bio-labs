import React from "react";
import { Mail } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import Image from "next/image";
import logo from "../../../public/lablogo.png"; // Make sure this path is correct

export default function Footer() {
  return (
    <footer className="pt-40 pb-4 bg-white text-[#1D0129]">
      <SectionWrapper className="flex flex-col space-y-4">
        {/* Top Footer Section */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          {/* Left: Logo Image */}
          <div className="flex items-center">
            <Image
              src={logo}
              alt="LabSpaces Logo"
              width={60}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Right: Contact and Copyright */}
          <div className="flex flex-col items-center md:items-end space-y-2 mt-4 md:mt-0">
            <a
              href="mailto:xavier.duportet@gmail.com"
              className="inline-flex items-center space-x-1 cursor-pointer border-b border-[#878991] hover:opacity-75"
            >
              <Mail className="w-3 h-3 text-[#878991]" />
              <span className="text-[14px] font-normal text-[#878991]">Contact Us</span>
            </a>

            <span className="text-[12px] text-[#a7a7aa] font-normal">
              © 2025 LabSpaces. Made with ❤️ for the community by Xavier D.
            </span>
          </div>
        </div>
      </SectionWrapper>
    </footer>
  );
}
