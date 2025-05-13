"use client";

import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./heroSection/HeroSection";
import FilterBar from "./FilterBar";
import Loader from "./components/Loader";
import dynamic from "next/dynamic";
import SectionWrapper from "./components/SectionWrapper";
import LabCard from "./components/cards/LabCard";
import { fetchLabSpaces } from "./lib/airtable";
const Maps = dynamic(() => import("./components/Maps"), { ssr: false });
export default function Home() {
  const [labs, setLabs] = useState([]);
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchLabSpaces();
      setFilteredLabs(data);
      setLabs(data);
    } catch (err) {
      console.error("Error loading labs:", err);
      setError("Failed to load labs. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFiltersChange = useCallback(
    ({ regions, labos, structures, ouvreProchainement }) => {
      let result = [...labs];
  
      // Filter by regions (multiple can be selected)
      if (regions && regions.length > 0) {
        result = result.filter((lab) => 
          lab.region && regions.includes(lab.region.trim())
        );
      }
  
      // Filter by labos (now checking array intersection)
      if (labos && labos.length > 0) {
        result = result.filter((lab) => {
          if (!lab.labos || !Array.isArray(lab.labos)) return false;
          return labos.some(selectedLabo => 
            lab.labos.map(l => l.trim()).includes(selectedLabo.trim())
          );
        });
      }
  
      // Filter by structures (now checking array intersection)
      if (structures && structures.length > 0) {
        result = result.filter((lab) => {
          if (!lab.lab_de_structure || !Array.isArray(lab.lab_de_structure)) return false;
          return structures.some(selectedStructure => 
            lab.lab_de_structure.map(s => s.trim()).includes(selectedStructure.trim())
          );
        });
      }
  
      // Filter by status
      if (ouvreProchainement) {
        result = result.filter(
          (lab) => lab.status === "Ouverture prévue dans le futur"
        );
      } else {
        // Optional: Show only "Ouvert" labs when unchecked
        result = result.filter((lab) => lab.status === "Ouvert");
      }
  
      setFilteredLabs(result);
    },
    [labs]
  );

  return (
    <>
      {/* <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={(lang) => setCurrentLanguage(lang)}
      /> */}
      <HeroSection />
      <Maps />
      <FilterBar onFiltersChange={handleFiltersChange} />
      <SectionWrapper className="">
        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredLabs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {filteredLabs.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No labs found for selected filters.
          </p>
        )}
      </SectionWrapper>
    </>
  );
}
