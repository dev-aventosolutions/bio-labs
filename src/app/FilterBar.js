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
          <div className="relative w-full md:w-[170px] text-[15.42px]">
            <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#1D0129] dark:text-[#1D0129] w-4 h-4" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="pl-9 pr-10 border border-[#E3E3E3] py-2 bg-[#F1F1F1] text-[#1D0129] outline-none appearance-none w-full cursor-pointer dark:bg-[#F1F1F1] dark:border-[#E3E3E3] dark:text-[#1D0129]"
              aria-label={t("filterBar.regions")}
            >
              <option value="">{t("filterBar.regions")}</option>
              {regions.map((region, i) => (
                <option key={i} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1D0129] dark:text-[#1D0129] w-4 h-4 pointer-events-none" />
          </div>

          {/* Labos */}
          <div className="relative w-full md:w-[170px] text-[15.42px]">
            <Hourglass className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#1D0129] dark:text-[#1D0129] w-4 h-4" />
            <select
              value={selectedLabo}
              onChange={(e) => setSelectedLabo(e.target.value)}
              className="pl-9 pr-10 border border-[#E3E3E3] py-2 bg-[#F1F1F1] text-[#1D0129] outline-none appearance-none w-full cursor-pointer dark:bg-[#F1F1F1] dark:border-[#E3E3E3] dark:text-[#1D0129]"
              aria-label={t("filterBar.labos")}
            >
              <option value="">{t("filterBar.labos")}</option>
              {labos.map((labo, i) => (
                <option key={i} value={labo}>
                  {labo}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1D0129] dark:text-[#1D0129] w-4 h-4 pointer-events-none" />
          </div>

          {/* Structures */}
          <div className="relative w-full md:w-[248px] text-[15.42px]">
            <Building2 className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#1D0129] dark:text-[#1D0129] w-4 h-4" />
            <select
              value={selectedStructure}
              onChange={(e) => setSelectedStructure(e.target.value)}
              className="pl-9 pr-10 border border-[#E3E3E3] py-2 bg-[#F1F1F1] text-[#1D0129] outline-none appearance-none w-full cursor-pointer dark:bg-[#F1F1F1] dark:border-[#E3E3E3] dark:text-[#1D0129]"
              aria-label={t("filterBar.structures")}
            >
              <option value="">{t("filterBar.structures")}</option>
              {structures.map((structure, i) => (
                <option key={i} value={structure}>
                  {structure}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1D0129] dark:text-[#1D0129] w-4 h-4 pointer-events-none" />
          </div>

          <div className="w-px h-10 bg-[#E3E3E3] mx-2 hidden sm:block" />

          {/* Checkbox Filter */}
          <div
  className={`relative flex items-center justify-between gap-2 px-4 py-2 cursor-pointer border border-[#E3E3E3] ${
    isOuvreProchainement ? 'bg-[#D31D74] text-white' : 'bg-white text-gray-800'
  } rounded-tl-lg rounded-br-lg w-full sm:w-auto`}
  onClick={() => setIsOuvreProchainement(!isOuvreProchainement)}
>
  <div
    className={`w-6 h-6 flex items-center justify-center rounded-full ${
      isOuvreProchainement ? 'bg-[#D31D74]' : 'bg-transparent'
    }`}
    style={{
      backgroundColor: isOuvreProchainement ? '#D31D74' : 'transparent',
    }}
  >
    <CheckCircle
      className={`w-4 h-4 ${
        isOuvreProchainement ? 'text-white' : 'text-gray-500'
      }`}
    />
  </div>

  <span className={`text-sm font-medium`}>
    {t('filterBar.ouvreProchainement')}
  </span>

  <div className="relative">
    <input
      type="checkbox"
      checked={isOuvreProchainement}
      onChange={(e) => setIsOuvreProchainement(e.target.checked)}
      className="w-4 h-4 rounded appearance-none focus:outline-none"
      style={{
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        appearance: 'none',
        backgroundColor: isOuvreProchainement ? '#D31D74' : '#fff',
        border: `1px solid ${isOuvreProchainement ? '#ffffff' : '#ccc'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
            <span className="text-sm font-medium">
              {t("filterBar.ajouterLieu") || "Ajouter un lieu"}
            </span>
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
