"use client";

import { useEffect, useRef, useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { Search } from "lucide-react";

export default function Maps() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCoords, setSelectedCoords] = useState(null);

  const timeoutRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (value.length > 2) {
      timeoutRef.current = setTimeout(async () => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              value
            )}`
          );
          const data = await res.json();
          setSuggestions(data);
        } catch (err) {
          console.error("Error fetching location suggestions:", err);
        }
      }, 400);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (place) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    setSelectedCoords({ lat, lon });
    setSearchTerm(place.display_name);
    setSuggestions([]);
  };

  return (
    <SectionWrapper className="relative w-full md:h-[60vh] h-[50vh]">
      {/* Search Box */}

      {/* Map Embed */}
      <div className="w-full h-full z-0">
        <iframe
          src="https://my.atlist.com/map/f5f00b02-abdf-4870-8240-fc1783f242d6?share=true"
          allow="geolocation 'self' https://my.atlist.com"
          width="100%"
          height="100%"
          loading="lazy"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          id="atlist-embed"
          className=""
        ></iframe>
      </div>

      {/* Optional: Preview Link to OpenStreetMap */}
      {selectedCoords && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2  shadow">
          <a
            href={`https://www.openstreetmap.org/?mlat=${selectedCoords.lat}&mlon=${selectedCoords.lon}#map=13/${selectedCoords.lat}/${selectedCoords.lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View {searchTerm} on OpenStreetMap
          </a>
        </div>
      )}
    </SectionWrapper>
  );
}
