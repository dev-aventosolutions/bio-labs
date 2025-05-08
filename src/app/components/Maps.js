"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import SectionWrapper from "./SectionWrapper";
import { Search } from "lucide-react";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const ChangeMapView = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13);
    }
  }, [coords, map]);
  return null;
};

export default function Maps() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCoords, setSelectedCoords] = useState([48.8566, 2.3522]);

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
    setSelectedCoords([lat, lon]);
    setSearchTerm(place.display_name);
    setSuggestions([]);
  };

  return (
<SectionWrapper className="relative w-full md:h-[70vh] h-[50vh]">
  {/* Search Box */}
  <div
  className="absolute z-[1000] bg-[#d2f1f7] dark:bg-[#d2f1f7] rounded-full shadow-md w-72 
  md:top-12 md:left-28 top-6 left-1/2 -translate-x-1/2 md:translate-x-0"
>
  <div className="relative">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleInputChange}
      className="w-full pr-10 pl-4 py-2 rounded-full outline-none text-black dark:text-black placeholder:text-gray-600 dark:placeholder:text-gray-600"
    />
    <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
  </div>

  {suggestions.length > 0 && (
    <ul className="bg-white dark:bg-white border border-gray-300 dark:border-gray-300 rounded shadow-md max-h-48 overflow-y-auto mt-1">
      {suggestions.map((place, i) => (
        <li
          key={i}
          onClick={() => handleSelectSuggestion(place)}
          className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-100 text-black dark:text-black"
        >
          {place.display_name}
        </li>
      ))}
    </ul>
  )}
</div>


  {/* Map Display */}
  <MapContainer
    center={selectedCoords}
    zoom={6}
    scrollWheelZoom={true}
    className="w-full h-full z-0"
    style={{ backgroundColor: "#d2f1f7" }}
  >
    <TileLayer
      attribution="&copy; OpenStreetMap contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={selectedCoords}>
      <Popup>{searchTerm || "Selected Location"}</Popup>
    </Marker>
    <ChangeMapView coords={selectedCoords} />
  </MapContainer>
</SectionWrapper>

  );
}
