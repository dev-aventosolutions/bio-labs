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

  const handleFiltersChange = useCallback(({ region, labo, structure }) => {
    let result = [...labs];
  
    if (region) {
      result = result.filter((lab) => lab.notes?.trim() === region);
    }
    if (labo) {
      result = result.filter((lab) =>
        Array.isArray(lab.labos) ? lab.labos.includes(labo) : false
      );
    }
    if (structure) {
      result = result.filter((lab) =>
        Array.isArray(lab.lab_de_structure)
          ? lab.lab_de_structure.includes(structure)
          : false
      );
    }
  
    setFilteredLabs(result);
  }, [labs]); // ✅ <-- add this dependency
  

  return (
    <>
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={(lang) => setCurrentLanguage(lang)}
      />
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
