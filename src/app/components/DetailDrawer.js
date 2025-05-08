"use client";

import { X, ArrowRight, Pencil, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function DetailDrawer({ isOpen, onClose, lab, onEditClick }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-10 z-40"
          onClick={onClose}
        ></div>
      )}

      {/* Drawer Content */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[700px] lg:w-[800px] bg-white dark:bg-white z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6 md:p-8">
          {/* Close Button - Fixed in top right corner */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-100transition-colors cursor-pointer"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-gray-600 cursor-pointer" />
            </button>
          </div>

          {/* Lab Image with loading animation */}
          <div className="mb-8 overflow-hidden relative">
  {/* Loading animation */}
  <div
    className={`absolute inset-0 bg-gray-200 dark:bg-gray-200 animate-pulse ${imageLoading ? "block" : "hidden"}`}
  ></div>

  {/* Image */}
  <Image
    src={lab.imageUrl || "/default.png"}
    alt={lab.name}
    width={800}
    height={400}
    className={`object-cover w-full h-[250px] md:h-[300px] transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"}`}
    onLoadingComplete={() => setImageLoading(false)}
    priority
  />

  {/* Show Lab Name and Created Year */}
  {(!lab.imageUrl || lab.imageUrl === "/default.png") && (
    <div className="absolute inset-0 flex items-center justify-center text-center">
      <hp className="text-white text-[27px] font-bold mb-1 truncate">
        {lab.name} {lab["Created on"] ? new Date(lab["Created on"]).getFullYear() : "N/A"}
      </hp>
    </div>
  )}
</div>


          {/* Main Content Container */}
          <div className="max-w-3xl mx-auto">
            {/* Lab Name */}
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-[27px] font-bold text-gray-900 dark:text-gray-900">
                {lab.name}
              </h1>
              <button
                onClick={onEditClick}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-100 transition-colors"
                aria-label="Edit lab"
              >
                <Pencil className="h-5 w-5 text-gray-600 dark:text-gray-600 cursor-pointer" />
              </button>
            </div>

            {/* Request Input */}
            <div className="flex gap-4 mb-10 items-center">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={lab["Attachment Summary"] || ""}
                  readOnly
                  className="w-full px-5 py-3 bg-[#F1F1F1] dark:bg-[#F1F1F1] text-[13px] text-[#696A78] dark:text-[#696A78] font-medium outline-none"
                />
                {lab["Attachment Summary"] && (
                  <a
                    href={lab["Attachment Summary"]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0"
                  />
                )}
              </div>

              <a
                href={lab["Attachment Summary"] || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F1F1F1] text-[13px] text-[#000000] py-3 px-4 flex items-center justify-center space-x-2 transition-colors dark:bg-[#F1F1F1] dark:text-[#000000] font-semibold"
              >
                <span>Alter</span>
                <ArrowUpRight className="h-3 w-3 font-semibold" />
              </a>
            </div>

            {/* Lab Details Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Type de structure */}
              <div>
                <h2 className="text-[13px] font-bold text-[#696A78] dark:[#696A78] mb-4">
                  Type de structure
                </h2>
                <div className="flex flex-wrap gap-3">
                  {lab.lab_de_structure?.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-blue-100 bg-white dark:bg-white dark:border-blue-100 px-2 "
                    >
                      <span className="text-[13px] font-semibold text-[#000000] dark:[#000000]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Type de laboratoire */}
              <div>
                <h2 className="text-[13px] font-bold text-[#696A78] dark:[#696A78] mb-4">
                  Type de laboratoire à la location
                </h2>
                <div className="flex flex-wrap gap-3">
                  {lab.labos?.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-red-100 bg-white dark:bg-white dark:red-100 px-2 "
                    >
                      <span className="text-[13px] font-semibold text-[#000000] dark:[#000000]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment candidater */}
              <div>
                <h2 className="text-[13px] font-bold text-[#696A78] dark:[#696A78] mb-4">
                  Comment candidater
                </h2>
                <div className="flex flex-wrap gap-3">
                  {lab.lab_de_structure?.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-gray-200 bg-gray-50 dark:bg-gray-50 dark:border-gray-200 px-2 "
                    >
                      <span className="text-[13px] font-semibold text-[#000000] dark:[#000000]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Type d'offre */}
              <div>
                <h2 className="text-[13px] font-bold text-[#696A78] dark:[#696A78] mb-4">
                  Type d&rsquo;offre
                </h2>
                <div className="flex flex-wrap gap-3">
                  {lab.lab_de_structure?.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-gray-200 bg-gray-50 dark:bg-gray-50 dark:border-gray-200 px-2"
                    >
                      <span className="text-[13px] font-semibold text-[#000000] dark:[#000000]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-t border-gray-200 dark:border-gray-200 my-8" />

            {/* Surface and Services */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Surface Info */}
              <div className="lg:col-span-1">
                <h2 className="text-[13px] font-bold text-[#696A78] dark:[#696A78] mb-4">
                  Surface Information
                </h2>
                <div className="space-y-3">
                  <p className="text-[13px] text-[#696A78] dark:[#696A78] font-medium">
                    <span className="font-bold">Surface totale:</span>{" "}
                    {lab.surface_totale} m²
                  </p>
                  <p className="text-[13px] text-[#696A78] dark:[#696A78]">
                    <span className="font-bold">Min de location:</span>{" "}
                    {lab.surface_min_totale} m²
                  </p>
                  <p className="text-[13px] text-[#696A78] dark:[#696A78]">
                    <span className="font-bold">Max de location:</span>{" "}
                    {lab.surface_max_totale} m²
                  </p>
                  <p className="text-[13px] text-[#696A78] dark:[#696A78] ">
                    <span className="font-bold">Durée max:</span>{" "}
                    {lab.duree_max_totale} mois
                  </p>
                </div>
              </div>

              {/* Services Communs Techniques */}
              <div className="lg:col-span-1">
                <h2 className="text-[13px] font-bold text-[#696A78] dark:[#696A78] mb-4">
                  Services Communs Techniques
                </h2>
                <div className="flex flex-wrap gap-3">
                  {lab.services_communs_techniques?.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-100 dark:bg-gray-100 rounded-full px-4 py-2"
                    >
                      <span className="text-[13px] text-[#696A78] dark:[#696A78]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Communs Facility Management */}
              <div className="lg:col-span-1">
                <h2 className="text-[13px] font-bold text-[#696A78] dark:[#696A78] mb-4">
                  Services Communs Facility
                </h2>
                <div className="flex flex-wrap gap-3">
                  {lab.services_communs_facility?.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2"
                    >
                      <span className="text-[13px] text-[#696A78] dark:[#696A78]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
