"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Microscope,
  Building2,
  ChevronDown,
  CheckCircle,
  PlusCircle,
  Hourglass,
} from "lucide-react";
import SectionWrapper from "./components/SectionWrapper";
import { fetchLabSpaces } from "./lib/airtable";
import { useTranslation } from "./lib/translate";
import { Listbox } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";


export default function FilterBar({ onFiltersChange }) {
  const { t } = useTranslation();
  const [regions, setRegions] = useState([]);
  const [labos, setLabos] = useState([]);
  const [structures, setStructures] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLabo, setSelectedLabo] = useState("");
  const [selectedStructure, setSelectedStructure] = useState("");
  const [isOuvreProchainement, setIsOuvreProchainement] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const labs = await fetchLabSpaces();
        const allRegions = [
          ...new Set(labs.map((lab) => lab.notes).filter(Boolean)),
        ];
        const allLabos = [
          ...new Set(labs.flatMap((lab) => lab.labos).filter(Boolean)),
        ];
        const allStructures = [
          ...new Set(
            labs.flatMap((lab) => lab.lab_de_structure).filter(Boolean)
          ),
        ];

        setRegions(allRegions);
        setLabos(allLabos);
        setStructures(allStructures);
      } catch (err) {
        console.error(t("filterBar.fetchError"), err);
      }
    };
    fetchData();
  }, [t]);

  useEffect(() => {
    onFiltersChange({
      region: selectedRegion,
      labo: selectedLabo,
      structure: selectedStructure,
      ouvreProchainement: isOuvreProchainement,
    });
  }, [
    selectedRegion,
    selectedLabo,
    selectedStructure,
    isOuvreProchainement,
    onFiltersChange,
  ]);

  

  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-4 w-full items-stretch">
        {/* Filters Group */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 flex-1">
          {/* Region */}
          <Listbox value={selectedRegion} onChange={setSelectedRegion}>
          <div className="relative w-full md:w-[140px] lg:w-[140px] text-[16px] font-normal cursor-pointer">
          <Listbox.Button className="flex items-center justify-between w-full border border-[#E3E3E3] bg-[#F1F1F1] text-[#1D0129] py-2 px-3 relative outline-none cursor-pointer">
  <div className="flex items-center space-x-2">
    <MapPin className="w-4 h-4 text-[#1D0129]" />
    <span className="truncate text-left">
      {selectedRegion || t("filterBar.regions")}
    </span>
  </div>
  <ChevronDown className="w-4 h-4 text-[#1D0129]" />
</Listbox.Button>


    <AnimatePresence>
      <Listbox.Options
        as={motion.ul}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute z-10  max-h-60 w-full overflow-auto  bg-white border-2 border-[#E3E3E3] py-1 text-[16px] focus:outline-none"
      >
        {regions.map((region, i) => (
          <Listbox.Option
            key={i}
            value={region}
            className={({ active }) =>
              `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                active ? "bg-[#D31D74] text-white" : "text-gray-900"
              }`
            }
          >
            {({ selected }) => (
              <>
                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                  {region}
                </span>
                {selected && (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                )}
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </AnimatePresence>
  </div>
</Listbox>

          {/* Labos */}
          <Listbox value={selectedLabo} onChange={setSelectedLabo}>
          <div className="relative w-full md:w-[140px] lg:w-[140px] text-[16px] font-normal cursor-pointer">    <Listbox.Button className="flex items-center justify-between w-full border border-[#E3E3E3] bg-[#F1F1F1] text-[#1D0129] py-2 px-3 relative outline-none cursor-pointer">
      <div className="flex items-center space-x-2">
        <Hourglass className="w-4 h-4 text-[#1D0129]" />
        <span className="truncate text-left">
          {selectedLabo || t("filterBar.labos")}
        </span>
      </div>
      <ChevronDown className="w-4 h-4 text-[#1D0129]" />
    </Listbox.Button>

    <AnimatePresence>
      <Listbox.Options
        as={motion.ul}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute z-10 max-h-60 w-full overflow-auto bg-white border-2 border-[#E3E3E3] py-1 text-[16px] focus:outline-none"
      >
        {labos.map((labo, i) => (
          <Listbox.Option
            key={i}
            value={labo}
            className={({ active }) =>
              `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                active ? "bg-[#D31D74] text-white" : "text-gray-900"
              }`
            }
          >
            {({ selected }) => (
              <>
                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                  {labo}
                </span>
                {selected && (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                )}
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </AnimatePresence>
  </div>
</Listbox>



          {/* Structures */}
          <Listbox value={selectedStructure} onChange={setSelectedStructure}>
          <div className="relative w-full md:w-[180px] lg:w-[180px] text-[16px] font-normal cursor-pointer">    <Listbox.Button className="flex items-center justify-between w-full border border-[#E3E3E3] bg-[#F1F1F1] text-[#1D0129] py-2 px-3 relative outline-none cursor-pointer">
      <div className="flex items-center space-x-2">
        <Building2 className="w-4 h-4 text-[#1D0129]" />
        <span className="truncate text-left">
          {selectedStructure || t("filterBar.structures")}
        </span>
      </div>
      <ChevronDown className="w-4 h-4 text-[#1D0129]" />
    </Listbox.Button>

    <AnimatePresence>
      <Listbox.Options
        as={motion.ul}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute z-10 max-h-60 w-full overflow-auto bg-white border-2 border-[#E3E3E3] py-1 text-[16px] focus:outline-none"
      >
        {structures.map((structure, i) => (
          <Listbox.Option
            key={i}
            value={structure}
            className={({ active }) =>
              `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                active ? "bg-[#D31D74] text-white" : "text-gray-900"
              }`
            }
          >
            {({ selected }) => (
              <>
                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                  {structure}
                </span>
                {selected && (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                    <CheckCircle className="w-4 h-4" />
                  </span>
                )}
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </AnimatePresence>
  </div>
</Listbox>

          <div className="w-px h-10 bg-[#E3E3E3] mx-2 hidden sm:block" />

          {/* Checkbox Filter */}
          <div
            className={`relative flex  items-center justify-between gap-2 px-4 py-2 cursor-pointer border border-[#E3E3E3] ${
              isOuvreProchainement
                ? "bg-[#D31D74] text-white text-[16px] font-normal"
                : "bg-white text-gray-800 text-[16px] font-normal"
            } rounded-tl-lg rounded-br-lg w-full sm:w-auto`}
            onClick={() => setIsOuvreProchainement(!isOuvreProchainement)}
          >
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                isOuvreProchainement ? "bg-[#D31D74]" : "bg-transparent"
              }`}
              style={{
                backgroundColor: isOuvreProchainement
                  ? "#D31D74"
                  : "transparent",
              }}
            >
              <CheckCircle
                className={`w-4 h-4 ${
                  isOuvreProchainement ? "text-white" : "text-gray-500"
                }`}
              />
            </div>

            <span className={`text-[16px] font-normal`}>
              {t("filterBar.ouvreProchainement")}
            </span>

            <div className="relative">
              <input
                type="checkbox"
                checked={isOuvreProchainement}
                onChange={(e) => setIsOuvreProchainement(e.target.checked)}
                className="w-4 h-4 rounded appearance-none focus:outline-none"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  backgroundColor: isOuvreProchainement ? "#D31D74" : "#fff",
                  border: `1px solid ${
                    isOuvreProchainement ? "#ffffff" : "#ccc"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 0,
                }}
              />
              {isOuvreProchainement && (
                <svg
                  className="absolute top-0.5 left-0.5 w-3 h-3 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <button
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 border 
              border-[#E3E3E3] bg-white text-[#1D0129] rounded-full hover:bg-gray-100 
              transition-all duration-200 dark:bg-white dark:text-[#1D0129] dark:border-[#E3E3E3] 
              dark:hover:bg-gray-100"
          >
            <PlusCircle className="w-4 h-4 text-[#1D0129]" />
            <span className="text-[16px] font-normal">
              {t("filterBar.ajouterLieu") || "Ajouter un lieu"}
            </span>
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
