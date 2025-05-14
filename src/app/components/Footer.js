import React from "react";
import { Mail } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import Image from "next/image";
import funnelImg from "../../../public/funnel.png";

export default function Footer() {
  return (
    <footer className="pt-40 pb-4 bg-white text-[#1D0129]">
      <SectionWrapper className="flex flex-col space-y-4">
        {/* Top Footer Section */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full">
          {/* Left: Logo */}
          <div className="flex flex-col items-center">
      {/* LAB with funnel as A */}
      <div className="flex items-center">
        <span className="font-black text-[30.35px]">L</span>
        <div className=" relative" style={{ width: 21, height: 22.55 }}>
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
      <span className="text-[15.85px] font-light mt-[-16px]">SPACES</span>    </div>
          {/* Right: Contact and Copyright */}
          <div className="flex flex-col items-center md:items-end space-y-2 mt-4 md:mt-0">
          <a
  href="mailto:xavier.duportrt@gmail.com"
  className="inline-flex items-center space-x-1 cursor-pointer border-b border-[#878991] hover:opacity-75"
>
  <Mail className="w-3 h-3 text-[#878991]" />
  <span className="text-[14px] font-normal text-[#878991]">Contact Us</span>
</a>

            <span className="text-[12px] text-[#a7a7aa] font-normal">
              © 2025 BioList. All rights reserved.
            </span>
          </div>
        </div>
      </SectionWrapper>
    </footer>
  );
}
