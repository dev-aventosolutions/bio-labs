"use client";

import { useState, useEffect } from "react";
import { fetchLabById, updateLabData } from "../lib/airtable";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Upload,
  Image as ImageIcon,
  Check,
  X,
  Edit,
} from "lucide-react";
import Loader from "../components/Loader";

function VerifyLab() {
  const router = useRouter();
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [expires, setExpires] = useState("");
  const [labId, setLabId] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  console.log("lab",lab)

  const regions = [
    "Bourgogne-Franche-Comté",
    "Bretagne",
    "Centre-Val de Loire",
    "Corse",
    "Grand Est",
    "Hauts-de-France",
    "Île-de-France",
    "Normandie",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Pays de la Loire",
    "Provence-Alpes-Côte d'Azur",
    "Guadeloupe",
    "Martinique",
    "Guyane",
    "La Réunion",
    "Mayotte"
  ];

  const statusOptions = [
    "Ouvert",
    "Ouverture prévue dans le futur",
    "En rénovation / Fermé",
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const labIdFromURL = searchParams.get("labId");
    const expiresFromURL = searchParams.get("expires");

    if (!labIdFromURL || !expiresFromURL) {
      setError("Invalid verification link");
      setLoading(false);
      return;
    }

    setLabId(labIdFromURL);
    setExpires(expiresFromURL);

    const currentTime = Date.now();
    if (currentTime > parseInt(expiresFromURL)) {
      setIsExpired(true);
      setLoading(false);
      return;
    }

    const fetchLab = async () => {
      try {
        const labData = await fetchLabById(labIdFromURL);
        if (labData) {
          setLab(labData);
          setImagePreview(labData.imageUrl || "");
        } else {
          setError("Lab not found");
        }
      } catch (err) {
        console.error("Error fetching lab:", err);
        setError("Failed to load lab data");
      } finally {
        setLoading(false);
      }
    };

    fetchLab();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // In VerifyLab component
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsUpdating(true);
  setError("");
  let photoField = [];
  
  if (imageFile) {
    photoField = [{ url: URL.createObjectURL(imageFile) }];
  } else if (lab.imageUrl) {
    photoField = [{ url: lab.imageUrl }];
  }

  try {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email"); // Get email from URL

    const updatedFields = {
      Name: lab?.name || "",
      "Type de structure": lab?.lab_de_structure || [],
      "Type de laboratoire à la location": lab?.labos || [],
      Geocache: lab?.geocache || "",
      "Surface totale (m2)": Number(lab?.surface_totale) || "0",
      "Surface minimale de location": Number(lab?.surface_min_totale) || "0",
      "Surface maximale de location": Number(lab?.surface_max_totale) || "0",
      "Durée maximale de location (en mois)": Number(lab?.duree_max_totale) || "0",
      "Services techniques communs": lab["Services techniques communs"] || [],
      "Services Généraux": lab["Services Généraux"] || [],
      Région: lab?.region || "",
      Status: lab?.status || "",
      "Comment candidater": lab["Comment candidater"] || [],
      Address: lab?.address || "",
      Description: lab?.description || "",
      "Code postal":Number(lab["Code postal"]) || 0,
      "Année d'ouverture":Number(lab["Année d'ouverture"]) || 0,
      "Contact email":lab["Contact email"] || "",
      "Site web":lab["Site web"] || "",
    };

    await updateLabData(labId, updatedFields);
    setSuccess(true);
    setTimeout(() => router.push("/"), 2000);
  } catch (err) {
    console.error("Error updating lab:", err);
    setError("Failed to update lab data");
  } finally {
    setIsUpdating(false);
  }
};

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLab((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayToggle = (fieldName, value) => {
    setLab((prev) => {
      const currentArray = prev[fieldName] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return { ...prev, [fieldName]: newArray };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <Clock className="w-12 h-12 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Link Expired</h1>
        <p className="text-gray-600 mb-6">This verification link has expired. Please request a new one.</p>
        <button 
          onClick={() => router.push("/")} 
          className="px-4 py-2 bg-[#D31D74] text-white rounded-lg hover:bg-[#C11868] transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <XCircle className="w-12 h-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h1>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => router.push("/")} 
          className="px-4 py-2 bg-[#D31D74] text-white rounded-lg hover:bg-[#C11868] transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Update Successful!</h1>
        <p className="text-gray-600 mb-6">The lab information has been updated.</p>
        <div className="w-full max-w-md bg-gray-100 rounded-full h-2.5">
          <div 
            className="bg-[#D31D74] h-2.5 rounded-full animate-pulse" 
            style={{ width: '100%' }}
          ></div>
        </div>
        <p className="text-gray-500 text-sm mt-4">Redirecting to home page...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#D31D74] to-[#A3155A] p-6 text-white">
          <h1 className="text-2xl font-bold">Verify and Update Lab</h1>
          <div className="flex items-center mt-2 text-pink-100">
            <Clock className="w-4 h-4 mr-2" />
            <span>
              This link expires in{" "}
              {expires
                ? Math.round((parseInt(expires) - Date.now()) / (1000 * 60 * 60))
                : 0}{" "}
              hours
            </span>
          </div>
        </div>

        {lab && (
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Image Upload */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Lab Image
              </label>
              <div className="flex items-start gap-6 flex-col sm:flex-row">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-lg overflow-hidden border-2 border-gray-200">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Lab preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <label className="absolute -bottom-3 -right-3 bg-white p-2 rounded-full shadow-md border border-gray-200 group-hover:bg-pink-50 cursor-pointer transition-colors">
                    <Edit className="w-5 h-5 text-gray-600 group-hover:text-[#D31D74]" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">
                    Upload a clear photo of your lab.
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lab Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab.name || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab.address || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Region */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                  Région
                  </label>
                  <select
                    name="region"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab.region || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a region</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ville */}
                {/* <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="ville"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab.ville || ""}
                    onChange={handleInputChange}
                  />
                </div> */}

                {/* Status */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab.status || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Select status</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                {/* postel code */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Code postal
                  </label>
                  <input
                    type="number"
                    name="Code postal"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab["Code postal"] || 0}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                {/* annee */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Année d'ouverture
                  </label>
                  <input
                    type="number"
                    name="Année d'ouverture"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab["Année d'ouverture"] || 0}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

{/* surface_totale */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                  Surface totale
                  </label>
                  <input
                    type="number"
                    name="surface_totale"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab.surface_totale || 0}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                {/* surface min totale */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                  Surface minimale de location
                  </label>
                  <input
                    type="number"
                    name="surface_min_totale"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab.surface_min_totale || 0}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                {/* surface max location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                  Surface maximale de location
                  </label>
                  <input
                    type="number"
                    name="surface_max_totale"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab.surface_max_totale || 0}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
{/* durree */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                  Durée maximale de location (en mois)
                  </label>
                  <input
                    type="number"
                    name="duree_max_totale"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab.duree_max_totale || 0}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>

                {/* geo */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                  Geocache <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="geocache"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab.geocache || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* contact email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                  Contact email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="Contact email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab["Contact email"] || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* site web */}
                {/* <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                  Site web <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    name="Site web"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab["Site web"] || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div> */}

                {/* Attachment Summary */}
                {/* <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Attachment Summary
                  </label>
                  <input
                    type="text"
                    name="Attachment Summary"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab["Attachment Summary"] || ""}
                    onChange={handleInputChange}
                  />
                </div> */}

                {/* Description */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab.description || ""}
                    onChange={handleInputChange}
                  />
                </div>

                {/* prix */}
                {/* <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Prix
                  </label>
                  <textarea
                    name="prix"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D31D74] focus:border-[#D31D74]"
                    value={lab.prix || ""}
                    onChange={handleInputChange}
                  />
                </div> */}
              </div>
            </div>

            {/* Lab Features Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Lab Features
              </h2>
              
              {/* Type de structure */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Type de structure
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Hotel d'entreprise",
                    "Pépinière d'entreprise",
                    "Incubateur",
                    "Accélérateur",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleArrayToggle("lab_de_structure", option)}
                      className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                        (lab.lab_de_structure || []).includes(option)
                          ? "bg-[#FCE4EE] text-[#D31D74] border border-[#D31D74]"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {(lab.lab_de_structure || []).includes(option) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="w-4 h-4"></span>
                      )}
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Labos */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                Type de laboratoire à la location
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "L1",
                    "L2",
                    "Possibilité L3",
                    "Possibilité Salle Blanche",
                    "Animalerie",
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleArrayToggle("labos", option)}
                      className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                        (lab.labos || []).includes(option)
                          ? "bg-[#FCE4EE] text-[#D31D74] border border-[#D31D74]"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {(lab.labos || []).includes(option) ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <span className="w-4 h-4"></span>
                      )}
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Services Communs Techniques */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                Services techniques communs
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Laverie",
                    "Autoclave",
                    "Etuve",
                    "Salle de culture 37°C",
                    "Salle de culture 4°C",
                    "Laboratoire Photos",
                  ].map((option) => (
                    <div
                      key={option}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                        (lab["Services techniques communs"] || []).includes(option)
                          ? "bg-[#FCE4EE] border-[#D31D74]"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                      onClick={() => handleArrayToggle("Services techniques communs", option)}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-md mr-3 flex items-center justify-center ${
                          (lab.services_communs_techniques || []).includes(option)
                            ? "bg-[#D31D74] text-white"
                            : "bg-gray-200"
                        }`}>
                          {(lab["Services techniques communs"] || []).includes(option) && (
                            <Check className="w-3 h-3" />
                          )}
                        </div>
                        <span className="text-sm">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Communs Facility Management */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                Services Généraux
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "Gardiennage",
                    "Accueil et standard téléphonique",
                    "Accès négocié restaurant d'entreprise",
                    "Salles de réunions",
                    "Nettoyage des locaux",
                    "Cafétéria",
                  ].map((option) => (
                    <div
                      key={option}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                        (lab["Services Généraux"] || []).includes(option)
                          ? "bg-[#FCE4EE] border-[#D31D74]"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                      onClick={() => handleArrayToggle("Services Généraux", option)}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-md mr-3 flex items-center justify-center ${
                          (lab.services_communs_facility || []).includes(option)
                            ? "bg-[#D31D74] text-white"
                            : "bg-gray-200"
                        }`}>
                          {(lab["Services Généraux"] || []).includes(option) && (
                            <Check className="w-3 h-3" />
                          )}
                        </div>
                        <span className="text-sm">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* comment conditor */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                Comment candidater
                </label>
                <div className="flex flex-col gap-3">
                  {[
                    "Au fil de l'eau",
                    "Appels à candidatures périodiques (dates précises dans l'année)",
                  ].map((option) => (
                    <div
                      key={option}
                      className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                        (lab["Comment candidater"] || []).includes(option)
                          ? "bg-[#FCE4EE] border-[#D31D74]"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                      }`}
                      onClick={() => handleArrayToggle("Comment candidater", option)}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                          (lab["Comment candidater"] || []).includes(option)
                            ? "bg-[#D31D74] text-white"
                            : "border border-gray-300"
                        }`}>
                          {(lab["Comment candidater"] || []).includes(option) && (
                            <Check className="w-3 h-3" />
                          )}
                        </div>
                        <span className="text-sm">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full py-3 px-6 bg-[#D31D74] hover:bg-[#C11868] text-white font-medium rounded-lg shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
              >
                {isUpdating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Confirm Update"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default VerifyLab;