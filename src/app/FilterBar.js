"use client";

import { useState, useEffect } from "react";
import {
  Microscope,
  Building2,
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
  const [regionCounts, setRegionCounts] = useState({});
  const [labosCounts, setLabosCounts] = useState({});
  const [structureCounts, setStructureCounts] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null); // 'regions', 'labos', 'structures', or null

 useEffect(() => {
  const fetchData = async () => {
    try {
      const labs = await fetchLabSpaces();

      if (!Array.isArray(labs)) {
        console.error("Expected labs to be an array, got:", labs);
        return;
      }

      // Calculate region counts
      const regionCounts = {};
      labs.forEach(lab => {
        if (lab.region) {
          regionCounts[lab.region] = (regionCounts[lab.region] || 0) + 1;
        }
      });

      // Calculate labos counts
      const labosCounts = {};
      labs.forEach(lab => {
        if (Array.isArray(lab.labos)) {
          lab.labos.forEach(labo => {
            if (labo) {
              labosCounts[labo] = (labosCounts[labo] || 0) + 1;
            }
          });
        }
      });

      // Calculate structure counts
      const structureCounts = {};
      labs.forEach(lab => {
        if (Array.isArray(lab.lab_de_structure)) {
          lab.lab_de_structure.forEach(structure => {
            if (structure) {
              structureCounts[structure] = (structureCounts[structure] || 0) + 1;
            }
          });
        }
      });

      setRegions(Object.keys(regionCounts));
      setLabos(Object.keys(labosCounts));
      setStructures(Object.keys(structureCounts));

      // Store the counts in state
      setRegionCounts(regionCounts);
      setLabosCounts(labosCounts);
      setStructureCounts(structureCounts);

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
      labos: selectedLabos,
      structures: selectedStructures,
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
    setSelectedLabos([]);
    setSelectedStructures([]);
    setRegionSearch("");
    setLaboSearch("");
    setStructureSearch("");
    setIsOuvreProchainement(false);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-3 w-full items-stretch md:pt-2">
        {/* Filters Group */}
        <div className="flex flex-col md:flex-row md:flex-wrap gap-2 flex-1">
          {/* First row on mobile - Regions and Labos */}
          <div className="flex flex-row gap-2 w-full md:w-auto">
            {/* Region Dropdown */}
            <div className="relative w-1/2 md:w-[175px] lg:w-[175px] md:text-[14px] text-[10px] font-normal cursor-pointer">
              <button
                className="flex items-center justify-between w-full border border-[#E3E3E3] bg-[#F1F1F1] text-[#1D0129] py-2 px-3 relative outline-none cursor-pointer"
                onClick={() => toggleDropdown('regions')}
              >
                <div className="flex items-center space-x-2 flex-wrap gap-1">
                  <MapPin
                    className="w-[16px] h-[16px]"
                    style={{ color: "rgba(29, 1, 41, 0.48)" }}
                  />
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
                    rotate: openDropdown === 'regions' ? 180 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="hidden md:block w-6 h-6 text-[#1D0129] text-normal" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openDropdown === 'regions' && (

                  <motion.div
                    key="dropdown"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="absolute z-50 min-w-[240px] w-full overflow-hidden bg-white border-2 border-[#E3E3E3]"
                  >
                    <div className="p-2">
                      <p className="text-[14px] font-medium p-2">Region ({regions.length})</p>
                      
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

                      <div className="max-h-60 overflow-y-auto">
                        {regions
                          .sort((a, b) => a.localeCompare(b))
                          .filter((region) =>
                            region.toLowerCase().includes(regionSearch.toLowerCase())
                          )
                          .map((region, i) => (
                            <div
                              key={i}
                              className="cursor-pointer text-[12px] select-none py-1 px-3 hover:bg-[#D31D74]/10 text-left flex items-center gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelection(region, selectedRegions, setSelectedRegions);
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={selectedRegions.includes(region)}
                                readOnly
                                className="w-[12px] h-[12px] border border-[#768aa7] accent-[#D31D74] appearance-none checked:bg-[#D31D74] checked:appearance-auto rounded-none"
                              />
                              <span className="text-[12px] font-normal text-[#686A78] flex justify-between w-full">
                                <span>{region} ({regionCounts[region] || 0})</span>
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Labos Dropdown */}
            <div className="relative w-1/2 md:w-[175px] lg:w-[175px] md:text-[14px] text-[10px] font-normal cursor-pointer">
              <button
                className="flex items-center justify-between w-full border border-[#E3E3E3] bg-[#F1F1F1] text-[#1D0129] py-2 px-3 relative outline-none cursor-pointer"
                onClick={() => toggleDropdown('labos')}
              >
                <div className="flex items-center space-x-2 flex-wrap gap-1">
                  <Labos className="w-[16px] h-[16px] text-gray-800" />
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
                  animate={{ rotate: openDropdown === 'labos' ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="hidden md:block w-6 h-6 text-[#1D0129] text-normal" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openDropdown === 'labos' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="absolute z-10 min-w-[240px] w-full overflow-hidden bg-white border-2 border-[#E3E3E3]"
                  >
                    <div className="p-2">
                      <p className="text-[14px] font-medium p-2">Labos ({labos.length})</p>

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
                          <FunnelX
                            className="w-4 h-4 cursor-pointer"
                            style={{ color: "rgba(29, 1, 41, 0.48)" }}
                          />
                        </button>
                      </div>

                      <div className="max-h-60 overflow-y-auto">
                        {labos
                          .sort((a, b) => a.localeCompare(b))
                          .filter((labo) =>
                            labo.toLowerCase().includes(laboSearch.toLowerCase())
                          )
                          .map((labo, i) => (
                            <div
                              key={i}
                              className="cursor-pointer text-[12px] select-none py-1 px-3 hover:bg-[#D31D74]/10 text-left flex items-center gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelection(labo, selectedLabos, setSelectedLabos);
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={selectedLabos.includes(labo)}
                                readOnly
                                className="w-[12px] h-[12px] border border-[#768aa7] accent-[#D31D74] appearance-none checked:bg-[#D31D74] checked:appearance-auto rounded-none"
                              />                          
                              <span className="text-[12px] font-normal text-[#686A78] flex justify-between w-full">
                                <span>{labo} ({labosCounts[labo] || 0})</span>
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Second row on mobile - Structures and Ouvre Prochainement */}
          <div className="flex flex-row gap-3 w-full md:w-auto">
            {/* Structures Dropdown */}
            <div className="relative w-1/2 md:w-[230px] lg:w-[230px] md:text-[14px] text-[10px] font-normal cursor-pointer">
              <button
                className="flex items-center justify-between w-full border border-[#E3E3E3] bg-[#F1F1F1] text-[#1D0129] py-2 px-3 relative outline-none cursor-pointer"
                onClick={() => toggleDropdown('structures')}
              >
                <div className="flex items-center space-x-2 flex-wrap gap-1">
                  <Structure
                    className="w-[16px] h-[16px]"
                    style={{ color: "rgba(29, 1, 41, 0.48)" }}
                  />
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
                  animate={{ rotate: openDropdown === 'structures' ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="hidden md:block w-6 h-6 text-[#1D0129] text-normal" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openDropdown === 'structures' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                    className="absolute z-10 min-w-[260px] w-full overflow-hidden bg-white border-2 border-[#E3E3E3]"
                  >
                    <div className="p-2">
                      <p className="text-[14px] font-medium p-2">
                        Type de Structure
                      </p>

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
                          <FunnelX
                            className="w-4 h-4 cursor-pointer"
                            style={{ color: "rgba(29, 1, 41, 0.48)" }}
                          />
                        </button>
                      </div>

                      <div className="max-h-60 overflow-y-auto">
                        {structures
                          .sort((a, b) => a.localeCompare(b))
                          .filter((structure) =>
                            structure
                              .toLowerCase()
                              .includes(structureSearch.toLowerCase())
                          )
                          .map((structure, i) => (
                            <div
                              key={i}
                              className="cursor-pointer text-[12px] select-none py-1 px-3 hover:bg-[#D31D74]/10 text-left flex items-center gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelection(structure, selectedStructures, setSelectedStructures);
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={selectedStructures.includes(structure)}
                                readOnly
                                className="w-[12px] h-[12px] border border-[#768aa7] accent-[#D31D74] appearance-none checked:bg-[#D31D74] checked:appearance-auto rounded-none"
                              />
                              <span className="text-[12px] font-normal text-[#686A78]">
                                {structure} ({structureCounts[structure] || 0})
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="hidden md:block w-px h-10.5 bg-gray-300" /> 

            {/* Checkbox Filter */}
            <div
              className={`relative flex items-center gap-3 px-4 md:py-2 py-1 cursor-pointer border border-[#E3E3E3] ${
                isOuvreProchainement
                  ? "bg-[#D31D74] text-white"
                  : "bg-white text-gray-800"
              } rounded-tl-lg rounded-br-lg w-1/2 md:w-auto`}
              onClick={() => setIsOuvreProchainement(!isOuvreProchainement)}
            >
              <div
                className={`w-[16px] h-[16px] flex items-center justify-center rounded-full ${
                  isOuvreProchainement ? "bg-[#D31D74]" : "bg-transparent"
                }`}
              >
                <Ouve
                  className={`w-[12.52px] h-[15px] ${
                    isOuvreProchainement ? "text-white" : "text-[#8B7E91]"
                  }`}
                />
              </div>

              <span
                className={`md:text-[14px] text-[10px] whitespace-nowrap font-normal leading-none ${
                  isOuvreProchainement ? "text-white" : "text-gray-800"
                }`}
              >
                Ouvre prochainement
              </span>

              <div className="relative w-4 h-4 flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={isOuvreProchainement}
                  onChange={(e) => setIsOuvreProchainement(e.target.checked)}
                  className="w-full h-full hidden md:block rounded appearance-none focus:outline-none"
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
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="w-full md:w-auto flex justify-center md:justify-end">
          <a
            href="https://airtable.com/appcbGHMp6K9gxvRJ/pag3yQEL1iWxN9HI3/form"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2 border 
              border-[#E3E3E3] bg-white text-[#1D0129] rounded-full hover:bg-gray-100 
              transition-all duration-200 dark:bg-white dark:text-[#1D0129] dark:border-[#E3E3E3] 
              dark:hover:bg-gray-100"
          >
            <Add className="w-[16px] h-[16px] text-[#1D0129]" />
            <span className="md:text-[14px] text-[10px] font-normal">
              {t("filterBar.ajouterLieu") || "Ajouter un lieu"}
            </span>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}