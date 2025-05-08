"use client";

import { useState } from "react";
import Image from "next/image";
import DetailDrawer from "../DetailDrawer";
import  EditModal  from "../EditModal";
import { useTranslation } from "../../lib/translate";

export default function LabCard({ lab: initialLab }) {
  const { t } = useTranslation();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDetailDrawer, setOpenDetailDrawer] = useState(false);
  // const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [lab, setLab] = useState(initialLab);
  console.log("lab",lab)

  // const showToast = (message, type = "success") => {
  //   setToast({ show: true, message, type });
  //   setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  // };

  const handleUpdateSuccess = (updatedLab) => {
    setLab(updatedLab);
    // showToast(t("labCard.updateSuccess"));
    setOpenEditModal(false);
    setOpenDetailDrawer(true);
  };

  const truncateText = (text, charLimit) => {
    if (text.length > charLimit) {
      return text.slice(0, charLimit) + "...";
    }
    return text;
  };
  
  
  return (
    <>
      {/* {toast.show && <Toast message={toast.message} type={toast.type} />} */}

      <div
  className="bg-white dark:bg-white cursor-pointer text-black dark:text-black rounded-lg overflow-hidden transition-shadow duration-300 p-2 flex flex-col h-full relative"
  style={{
    boxShadow: "0px 1px 1px 1px rgba(0, 0, 0, 0.15)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.boxShadow = "0px 4px 4px 0px rgba(0, 0, 0, 0.5)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.boxShadow = "0px 1px 1px 1px rgba(0, 0, 0, 0.15)";
  }}
  onClick={() => setOpenDetailDrawer(true)}
>
        <div
          className="relative h-40 w-full mb-4 rounded-md overflow-hidden"
          
        >
          {/* <Link href={`/labs/${lab.id}`} className="block h-full w-full"> */}
          {lab.imageUrl ? (
  <Image
    src={lab.imageUrl}
    alt={lab.name || "Lab Image"}
    fill
    className="object-cover cursor-pointer"
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
) : (
  <>
    <Image
      src="/default.png"
      alt="Default Image"
      fill
      className="object-cover cursor-pointer"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
    <div className="absolute inset-0  flex flex-col justify-center items-center text-white text-center px-2">
    <h3 className="text-sm font-bold mb-1 truncate">
          {truncateText(lab.name, 12)} {lab["Created on"] ? new Date(lab["Created on"]).getFullYear() : "N/A"}
        </h3>           
    </div>
  </>
)}

          {/* </Link> */}

          {/* <button
            onClick={() => setOpenDrawer(true)}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-200 transition z-10"
            aria-label={t('labCard.editButton')}
          >
            <Pencil className="h-4 w-4 text-gray-700 cursor-pointer" />
          </button> */}
        </div>

        <div className="flex flex-col justify-between flex-grow">
          <h3 className="text-[15.42px] font-bold mb-2 truncate">{lab.name}</h3>

          <div className="mb-2">
  <p className="text-[11px] font-medium text-[#56575B] dark:text-[#56575B] mb-1">
    {t("labCard.region")}
  </p>
  <span
    className={`px-2 py-1 text-[12px] font-medium rounded-full ${
      lab.notes
        ? "bg-[#ffe0cc] text-[#000000]"
        : "bg-red-100 text-red-800"
    }`}
  >
    {lab.notes || t("labCard.noRegion")}
  </span>
</div>

<div className="mb-2">
  <p className="text-[11px] font-medium text-[#56575B] dark:text-[#56575B] mb-1">
    {t("labCard.labos")}
  </p>
  <div className="flex flex-wrap gap-2">
    {lab.labos && lab.labos.length > 0 ? (
      lab.labos.map((item, index) => {
        let bgColor = "bg-green-100";
        let textColor = "text-green-800";

        if (item === "L1") {
          bgColor = "bg-[#d1e2ff]";
          textColor = "text-[#000000]";
        } 
        if(item === "L2") {
          bgColor = "bg-[#c4ecff]";
          textColor = "text-[#000000]";
        }
        else if (item === "Animalerie") {
          bgColor = "bg-[#ffeab6]";
          textColor = "text-[#000000]";
        }

        return (
          <span
            key={index}
            className={`px-2 py-1 text-[12px] font-medium rounded-full ${bgColor} ${textColor}`}
          >
            {item}
          </span>
        );
      })
    ) : (
      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
        {t("labCard.noLabos")}
      </span>
    )}
  </div>
</div>


          <div className="mb-2">
            <p className="text-[11px] font-medium text-[#56575B] dark:text-[#56575B] mb-1">
              {t("labCard.structure")}
            </p>
            <div className="flex flex-wrap gap-2">
              {lab.lab_de_structure && lab.lab_de_structure.length > 0 ? (
                lab.lab_de_structure.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-[12px] font-medium rounded-full bg-green-100 text-green-800"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="px-2 py-1 text-[12px] font-medium rounded-full bg-red-100 text-red-800">
                  {t("labCard.noStructure")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <DetailDrawer
        isOpen={openDetailDrawer}
        onClose={() => setOpenDetailDrawer(false)}
        lab={lab}
        onEditClick={() => {
          setOpenDetailDrawer(false);
          setOpenEditModal(true);
        }}
      />

      <EditModal
        isOpen={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setOpenDetailDrawer(true);
        }}
        lab={lab}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </>
  );
}
