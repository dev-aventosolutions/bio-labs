import React from "react";
import { Mail } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import Image from "next/image";
import logo from "../../../public/lablogo.png"; // Ensure path is correct

export default function Footer() {
  return (
    <footer className=" pb-10 bg-white text-[#1D0129]">
      <SectionWrapper className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left space-y-4 md:space-y-0">
          
          {/* Logo: Appears first on small screens, left on medium+ */}
          <div className="flex justify-center md:justify-start order-1 md:order-1 w-full md:w-auto">
            <Image
              src={logo}
              alt="LabSpaces Logo"
              width={90}
              height={60}
              className="object-contain"
            />
          </div>

          {/* Contact Info: Appears below logo on small screens, right on medium+ */}
          <div className="flex flex-col items-center md:items-end space-y-2 order-2 md:order-2 w-full md:w-auto">
            <a
              href="mailto:xavier.duportet@gmail.com"
              className="inline-flex items-center space-x-1 cursor-pointer border-b border-[#878991] hover:opacity-75"
            >
              <Mail className="w-3 h-3 text-[#878991]" />
              <span className="text-[14px] font-normal text-[#878991]">
                Contact me
              </span>
            </a>

            <span className="text-[12px] text-[#a7a7aa] font-normal md:text-right block">
            Made with ❤️ for the community by Xavier D. <br/>
            ©️ 2025 LabSpaces.
            </span>
          </div>
        </div>
      </SectionWrapper>
    </footer>
  );
}
