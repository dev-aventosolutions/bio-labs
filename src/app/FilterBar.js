"use client";

import { useState, useEffect } from "react";
import {
  Microscope,
  Building2,
  // ChevronDown,
  CheckCircle,
  PlusCircle,
  Hourglass,
  XIcon,
  FunnelX,
  Search,
} from "lucide-react";
import SectionWrapper from "./components/SectionWrapper";
import { fetchLabSpaces } from "./lib/airtable";
import { useTranslation } from "./lib/translate";
import { Listbox } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ChevronDown,
  Labos,
  Structure,
  Ouve,
  Add,
} from "./components/Icons";

export default function FilterBar({ onFiltersChange }) {
  const { t } = useTranslation();
  const [regions, setRegions] = useState([]);
  const [labos, setLabos] = useState([]);
  const [structures, setStructures] = useState([]);
  const [selectedLabos, setSelectedLabos] = useState([]);
  const [selectedStructures, setSelectedStructures] = useState([]);
  const [isOuvreProchainement, setIsOuvreProchainement] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [regionSearch, setRegionSearch] = useState("");
  const [laboSearch, setLaboSearch] = useState("");
  const [structureSearch, setStructureSearch] = useState("");
  const [isStructureOpen, setIsStructureOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const labs = await fetchLabSpaces();
        const allRegions = [
          ...new Set(labs.map((lab) => lab.region).filter(Boolean)),
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

  const toggleSelection = (item, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  useEffect(() => {
    onFiltersChange({
      regions: selectedRegions,
      labos: selectedLabos, // Now passing array
      structures: selectedStructures, // Now passing array
      ouvreProchainement: isOuvreProchainement,
    });
  }, [
    selectedRegions,
    selectedLabos,
    selectedStructures,
    isOuvreProchainement,
    onFiltersChange,
  ]);

  const handleClearAll = () => {
    setSelectedRegions([]);
    setSelectedLabos([]); // Changed from setSelectedLabo
    setSelectedStructures([]); // Changed from setSelectedStructure
    setRegionSearch("");
    setLaboSearch("");
    setStructureSearch("");
    setIsOuvreProchainement(false);
  };

  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-3 w-full items-stretch">
        {/* Filters Group */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 flex-1">
          {/* Region */}
          <Listbox
            value={selectedRegions}
            onChange={setSelectedRegions}
            multiple
          >
            {({ open }) => (
              <div className="relative w-full md:w-[175px] lg:w-[175px] text-[16px] font-normal cursor-pointer">
                <Listbox.Button className="flex items-center justify-between w-full border border-[#E3E3E3] bg-[#F1F1F1] text-[#1D0129] py-2 px-3 relative outline-none cursor-pointer">
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <MapPin />
                    <span className="text-left truncate flex items-center gap-1">
                      {t("filterBar.regions")}
                      {selectedRegions.length > 0 && (
                        <span className="w-4 h-4 rounded-full bg-gray-200 text-black text-[10px] flex items-center justify-center">
                          {selectedRegions.length}
                        </span>
                      )}
                    </span>
                  </div>
                  <motion.div
                    animate={{
                      rotate: open ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4 text-[#1D0129]" />
                  </motion.div>{" "}
                </Listbox.Button>

                <AnimatePresence>
                  <Listbox.Options
                    as={motion.ul}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-50 max-h-60 min-w-[240px] w-full overflow-y-auto bg-white border-2 border-[#E3E3E3] py-1 text-[16px] focus:outline-none"
                  >
                    <p className="text-[16px] font-medium p-2">Region</p>
                    {/* Search bar and funnel in one line */}
                    <div className="p-2 flex items-center justify-between gap-2">
                      <div className="relative w-full">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full pl-8 pr-2 py-1 border border-gray-300 outline-none text-[14px] font-normal bg-[#F1F1F1] focus:ring-2 focus:ring-[#D31D74] focus:border-[#D31D74]"
                          value={regionSearch}
                          onChange={(e) => setRegionSearch(e.target.value)}
                        />
                      </div>
                      <button
                        onClick={handleClearAll}
                        className="text-[#1D0129] flex items-center justify-center"
                      >
                        <FunnelX className="w-4 h-4 cursor-pointer text-gray-400" />
                      </button>
                    </div>

                    {/* Filtered Region Options with Checkboxes */}
                    {regions
  .sort((a, b) => a.localeCompare(b)) // Sort alphabetically
  .filter((region) =>
    region.toLowerCase().includes(regionSearch.toLowerCase())
  )
  .map((region, i) => (
    <li
      key={i}
      className="cursor-pointer text-[12px] select-none py-2 px-3 hover:bg-[#D31D74]/10 text-left flex items-center gap-2"
      onClick={(e) => {
        e.stopPropagation();
        const alreadySelected = selectedRegions.includes(region);
        if (alreadySelected) {
          setSelectedRegions(
            selectedRegions.filter((r) => r !== region)
          );
        } else {
          setSelectedRegions([...selectedRegions, region]);
        }
      }}
    >
      <input
        type="checkbox"
        checked={selectedRegions.includes(region)}
        readOnly
        className="accent-[#D31D74]"
      />
      <span className="text-[12px] font-normal text-[#686A78]">
        {region}
      </span>
    </li>
  ))}

                  </Listbox.Options>
                </AnimatePresence>
              </div>
            )}
          </Listbox>

          {/* Labos */}
          <Listbox value={selectedLabos} onChange={setSelectedLabos} multiple>
            {({ open }) => (
              <div className="relative w-full md:w-[175px] lg:w-[175px] text-[16px] font-normal cursor-pointer">
                <Listbox.Button className="flex items-center justify-between w-full border border-[#E3E3E3] bg-[#F1F1F1] text-[#1D0129] py-2 px-3 relative outline-none cursor-pointer">
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <Labos className="w-4 h-4 text-[#1D0129]" />
                    <span className="text-left truncate flex items-center gap-1">
                      {t("filterBar.labos")}
                      {selectedLabos.length > 0 && (
                        <span className="w-4 h-4 rounded-full bg-gray-200 text-black text-[10px] flex items-center justify-center">
                          {selectedLabos.length}
                        </span>
                      )}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4 text-[#1D0129]" />
                  </motion.div>{" "}
                </Listbox.Button>

                <AnimatePresence>
                  <Listbox.Options
                    as={motion.ul}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 max-h-60 min-w-[240px] w-full overflow-auto bg-white border-2 border-[#E3E3E3] py-1 text-[16px] focus:outline-none"
                  >
                    <p className="text-[16px] font-semibold p-2">Labos</p>

                    {/* Search Input and Funnel Icon in One Line */}
                    <div className="p-2 flex items-center justify-between gap-2">
                      <div className="relative w-full">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full pl-8 pr-2 py-1 border border-gray-300 outline-none text-[14px] font-normal bg-[#F1F1F1] focus:ring-2 focus:ring-[#D31D74] focus:border-[#D31D74]"
                          value={laboSearch}
                          onChange={(e) => setLaboSearch(e.target.value)}
                        />
                      </div>
                      <button
                        onClick={handleClearAll}
                        className="text-[#1D0129] flex items-center justify-center"
                      >
                        <FunnelX className="w-4 h-4 cursor-pointer text-gray-400" />
                      </button>
                    </div>

                    {/* Filtered Labos with Checkboxes */}
                    {labos
  .sort((a, b) => a.localeCompare(b)) // Sort alphabetically A–Z
  .filter((labo) =>
    labo.toLowerCase().includes(laboSearch.toLowerCase())
  )
  .map((labo, i) => (
    <li
      key={i}
      className="cursor-pointer text-[12px] select-none py-2 px-3 hover:bg-[#D31D74]/10 text-left flex items-center gap-2"
      onClick={(e) => {
        e.stopPropagation();
        const alreadySelected = selectedLabos.includes(labo);
        if (alreadySelected) {
          setSelectedLabos(
            selectedLabos.filter((l) => l !== labo)
          );
        } else {
          setSelectedLabos([...selectedLabos, labo]);
        }
      }}
    >
      <input
        type="checkbox"
        checked={selectedLabos.includes(labo)}
        readOnly
        className="accent-[#D31D74]"
      />
      <span className="text-[12px] font-normal text-[#686A78]">
        {labo}
      </span>
    </li>
  ))}

                  </Listbox.Options>
                </AnimatePresence>
              </div>
            )}
          </Listbox>

          {/* Structures - Updated to match regions */}
          <Listbox
            value={selectedStructures}
            onChange={setSelectedStructures}
            multiple
          >
            {({ open }) => (
              <div className="relative w-full md:w-[230px] lg:w-[230px] text-[16px] font-normal cursor-pointer">
                <Listbox.Button className="flex items-center justify-between w-full border border-[#E3E3E3] bg-[#F1F1F1] text-[#1D0129] py-2 px-3 relative outline-none cursor-pointer">
                  <div className="flex items-center space-x-2 flex-wrap gap-1">
                    <Structure className="w-4 h-4 text-[#1D0129]" />
                    <span className="text-left truncate flex items-center gap-1">
                      {t("filterBar.structures")}
                      {selectedStructures.length > 0 && (
                        <span className="w-4 h-4 rounded-full bg-gray-200 text-black text-[10px] flex items-center justify-center">
                          {selectedStructures.length}
                        </span>
                      )}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-4 h-4 text-[#1D0129]" />
                  </motion.div>{" "}
                </Listbox.Button>

                <AnimatePresence>
                  <Listbox.Options
                    as={motion.ul}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 max-h-60 min-w-[260px] w-full overflow-auto bg-white border-2 border-[#E3E3E3] py-1 text-[16px] focus:outline-none"
                  >
                    <p className="text-[16px] font-semibold p-2">
                      Type de Structure
                    </p>

                    {/* Search input with icon and funnel button */}
                    <div className="p-2 flex items-center justify-between gap-2">
                      <div className="relative w-full">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="w-full pl-8 pr-2 py-1 border border-gray-300 outline-none text-[14px] font-normal bg-[#F1F1F1] focus:ring-2 focus:ring-[#D31D74] focus:border-[#D31D74]"
                          value={structureSearch}
                          onChange={(e) => setStructureSearch(e.target.value)}
                        />
                      </div>
                      <button
                        onClick={handleClearAll}
                        className="text-[#1D0129] flex items-center justify-center"
                      >
                        <FunnelX className="w-4 h-4 cursor-pointer text-gray-400" />
                      </button>
                    </div>

                    {/* Filtered Structures */}
                    {structures
  .sort((a, b) => a.localeCompare(b)) // Alphabetical sort A-Z
  .filter((structure) =>
    structure.toLowerCase().includes(structureSearch.toLowerCase())
  )
  .map((structure, i) => (
    <li
      key={i}
      className="cursor-pointer text-[12px] select-none py-2 px-3 hover:bg-[#D31D74]/10 text-left flex items-center gap-2"
      onClick={(e) => {
        e.stopPropagation();
        const alreadySelected = selectedStructures.includes(structure);
        if (alreadySelected) {
          setSelectedStructures(
            selectedStructures.filter((s) => s !== structure)
          );
        } else {
          setSelectedStructures([...selectedStructures, structure]);
        }
      }}
    >
      <input
        type="checkbox"
        checked={selectedStructures.includes(structure)}
        readOnly
        className="accent-[#D31D74]"
      />
      <span className="text-[12px] font-normal text-[#686A78]">
        {structure}
      </span>
    </li>
  ))}

                  </Listbox.Options>
                </AnimatePresence>
              </div>
            )}
          </Listbox>

          <div className="w-px h-10 bg-[#E3E3E3] mx-2 hidden sm:block" />

          {/* Checkbox Filter */}
          <div
            className={`relative flex items-center justify-between gap-2 px-4 py-2 cursor-pointer border border-[#E3E3E3] ${
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
              <Ouve
                className={`w-4 h-4 ${
                  isOuvreProchainement ? "text-white" : "text-gray-500"
                }`}
              />
            </div>

            <span className="text-[16px] font-normal">
              {isOuvreProchainement
                ? "Ouvre prochainement"
                : "Ouvre prochainement"}
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
            <Add className="w-4 h-4 text-[#1D0129]" />
            <span className="text-[16px] font-normal">
              {t("filterBar.ajouterLieu") || "Ajouter un lieu"}
            </span>
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
