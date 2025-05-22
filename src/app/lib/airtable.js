const API_KEY = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
const BASE_ID = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
const TABLE_NAME = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME;

const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

export const fetchLabSpaces = async () => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to fetch lab spaces");

  const data = await response.json();

  return data.records.map((record) => ({
    id: record.id,
    name: record.fields["Name"] || "Untitled Lab",
    imageUrl: record.fields["Photo"] ? record.fields["Photo"][0]?.url : "",
    location: record.fields["Location"] || "Location not specified",
    tags: record.fields["Tags"] || [],
    available: record.fields["Available"] || false,
    area: record.fields["Area"] || "N/A",
    services: record.fields["Services"] || ["No services listed"],
    openingSoon: record.fields["OpeningSoon"] || false,
    notes: record.fields["Notes"] || "",
    labos: Array.isArray(record.fields["Type de laboratoire à la location"])
      ? record.fields["Type de laboratoire à la location"]
      : record.fields["Type de laboratoire à la location"]
      ? [record.fields["Type de laboratoire à la location"]]
      : [],
    lab_de_structure: Array.isArray(record.fields["Type de structure"])
      ? record.fields["Type de structure"]
      : record.fields["Type de structure"]
      ? [record.fields["Type de structure"]]
      : [],
    geocache: record.fields["Geocache"] || "",
    surface_totale: record.fields["Surface totale (m2)"] || "0",
    surface_min_totale: record.fields["Surface minimale de location"] || "0",
    surface_max_totale: record.fields["Surface maximale de location"] || "0",
    duree_max_totale:
      record.fields["Durée maximale de location (en mois)"] || "0",
    "Services techniques communs": Array.isArray(
      record.fields["Services techniques communs"]
    )
      ? record.fields["Services techniques communs"]
      : record.fields["Services techniques communs"]
      ? [record.fields["Services techniques communs"]]
      : [],
    "Services Généraux": Array.isArray(
      record.fields["Services Généraux"]
    )
      ? record.fields["Services Généraux"]
      : record.fields["Services Généraux"]
      ? [record.fields["Services Généraux"]]
      : [],
    "Contact email": record.fields["Contact email"] || "",
    // "Attachment Summary": record.fields["Attachment Summary"] || "",
    "Created on": record.fields["Created on"] || "",
    region: record.fields["Région"] || "",
    year: record.fields["Année d'ouverture"] || "",
    status: record.fields["Status"] || "Ouvert",
    offer: record.fields["Type d'offre"] || "",
    ville: record.fields["Ville"] || "",
    address: record.fields["Address"] || "",
    // attachment: record.fields["Attachments"] || 0,
    application: record.fields["Comment candidater"] || "",
    description: record.fields["Description"] || "",
    quell:
      record.fields["Quelle type de surfaces une startup peut elle louer?"] ||
      "",
      prix:record.fields["Prix"] || "",
      siteWeb:record.fields["Site web"] || "",
      "Code postal":record.fields["Code postal"] || 0,
      "Année d'ouverture":record.fields["Année d'ouverture"] || 0


  }));
};

export const fetchLabById = async (id) => {
  console.log(`${API_URL}/${id}`);
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to fetch lab by ID");

  const record = await response.json();

  return {
    id: record.id,
    name: record.fields["Name"] || "Untitled Lab",
    imageUrl: record.fields["Photo"] ? record.fields["Photo"][0]?.url : "",
    location: record.fields["Location"] || "Location not specified",
    tags: record.fields["Tags"] || [],
    available: record.fields["Available"] || false,
    area: record.fields["Area"] || "N/A",
    services: record.fields["Services"] || ["No services listed"],
    openingSoon: record.fields["OpeningSoon"] || false,
    notes: record.fields["Notes"] || "",
    labos: Array.isArray(record.fields["Type de laboratoire à la location"])
      ? record.fields["Type de laboratoire à la location"]
      : record.fields["Type de laboratoire à la location"]
      ? [record.fields["Type de laboratoire à la location"]]
      : [],
    lab_de_structure: Array.isArray(record.fields["Type de structure"])
      ? record.fields["Type de structure"]
      : record.fields["Type de structure"]
      ? [record.fields["Type de structure"]]
      : [],
    geocache: record.fields["Geocache"] || "",
    surface_totale: record.fields["Surface totale (m2)"] || "N/A",
    surface_min_totale: record.fields["Surface minimale de location"] || "N/A",
    surface_max_totale: record.fields["Surface maximale de location"] || "N/A",
    duree_max_totale:
      record.fields["Durée maximale de location (en mois)"] || "N/A",
    "Services techniques communs": Array.isArray(
      record.fields["Services techniques communs"]
    )
      ? record.fields["Services techniques communs"]
      : record.fields["Services techniques communs"]
      ? [record.fields["Services techniques communs"]]
      : [],
    "Services Généraux": Array.isArray(
      record.fields["Services Généraux"]
    )
      ? record.fields["Services Généraux"]
      : record.fields["Services Généraux"]
      ? [record.fields["Services Généraux"]]
      : [],
    "Contact email": record.fields["Contact email"] || "",
    // "Attachment Summary": record.fields["Attachment Summary"] || "",
    "Created on": record.fields["Created on"] || "",
    region: record.fields["Région"] || "",
    year: record.fields["Année d'ouverture"] || "",
    status: record.fields["Status"] || "Ouvert",
    offer: record.fields["Type d'offre"] || "",
    ville: record.fields["Ville"] || "",
    address: record.fields["Address"] || "",
    // attachment: record.fields["Attachments"] || "",
    application: record.fields["Comment candidater"] || "",
    description: record.fields["Description"] || "",

    quell:
      record.fields["Quelle type de surfaces une startup peut elle louer?"] ||
      "",
      prix:record.fields["Prix"] || "",
            siteWeb:record.fields["Site web"] || "",
                  "Code postal":record.fields["Code postal"] || 0,
"Année d'ouverture":record.fields["Année d'ouverture"] || 0

  };
};

// update
export const updateLabData = async (id, updatedData) => {
  const response = await fetch(
    `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: updatedData,
      }),
    }
  );

  const result = await response.json();
  console.log("Airtable response JSON:", result);

  if (!response.ok) throw new Error("Failed to update lab data");

  return result;
};

// check email exists =

export const checkEmailExists = async (email) => {
  const filterFormula = `LOWER({Contact email}) = '${email.toLowerCase()}'`;
  const url = `${API_URL}?filterByFormula=${encodeURIComponent(
    filterFormula
  )}&maxRecords=1`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to check email in Airtable");
  }

  const data = await response.json();

  return data.records.length > 0;
};

// fetch FAQs from "FAQ" table
export const fetchFAQs = async () => {
  const FAQ_API_URL = `https://api.airtable.com/v0/${BASE_ID}/FAQ`;

  const response = await fetch(FAQ_API_URL, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch FAQs");
  }

  const data = await response.json();

  return data.records
    .filter((record) => record.fields["Question"] && record.fields["Details"])
    .sort((a, b) => (a.fields.Position || 999) - (b.fields.Position || 999))
    .map((record) => ({
      id: record.id,
      question: record.fields["Question"],
      answer: record.fields["Details"],
      position: record.fields["Position"] || 999,
    }));
};
