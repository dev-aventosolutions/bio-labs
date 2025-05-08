"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { checkEmailExists } from "../lib/airtable";
import Toast from "./Toast";
import emailjs from "@emailjs/browser";

export default function EditModal({ isOpen, onClose, lab, onUpdateSuccess }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(lab.Name || lab.name || "");
      setEmail("");
      setError("");
      // Initialize EmailJS (you only need to do this once)
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
    }
  }, [isOpen, lab]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const sendVerificationEmail = async () => {
    try {
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000; 
      const verificationLink = `${window.location.origin}/verify-lab-update?labId=${lab.id}&expires=${expirationTime}`;

      const templateParams = {
        to_email: email,
        lab_name: lab.name || lab.Name,
        contact_name: name,
        verification_link: verificationLink,
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      return response.status === 200;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Validate email domain
      const inputDomain = email.split("@")[1];
      const contactDomain = lab["Contact email"].split("@")[1];

      if (!inputDomain || !contactDomain || inputDomain !== contactDomain) {
        setError(`Email domain must match ${contactDomain}`);
        setIsLoading(false);
        return;
      }

      // Check if email exists in Airtable
      const emailExists = await checkEmailExists(email);

      if (emailExists) {
        // Send verification email via EmailJS
        const emailSent = await sendVerificationEmail();

        if (emailSent) {
          showToast("Verification email sent. Please check your inbox.");
          onClose();
        } else {
          showToast("Failed to send verification email", "error");
        }
      } else {
        setError(
          "Email not found in our system. Please use a registered email."
        );
      }
    } catch (error) {
      console.error("Update failed:", error);
      showToast("An error occurred. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {toast.show && <Toast message={toast.message} type={toast.type} />}

      <div
        className="fixed inset-0 bg-black opacity-40 z-40"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div
          className="bg-white dark:white rounded-lg w-full max-w-md mx-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#696A78] dark:text-[#696A78]">
                Edit Lab
              </h2>
              <button
                onClick={onClose}
                className="text-[#696A78] hover:text-[#696A78] dark:text-[#696A78] dark:hover:text-[#696A78]"
              >
                <X className="h-5 w-5 cursor-pointer" />
              </button>
            </div>

            {/* <p className="text-sm text-[#696A78] dark:text-[#696A78] mb-4">
              You are editing <strong>{lab.name}</strong>
            </p> */}

            {/* <div className="mb-4">
              <label className="block text-sm text-[#696A78] dark:text-[#696A78] mb-1">
                New Lab Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-300 rounded bg-white dark:bg-white text-[#696A78] dark:text-[#696A78]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div> */}

            <div className="mb-4">
              <label className="block text-sm text-[#696A78] dark:text-[#696A78] mb-1">
                Verify with Contact Email
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 dark:border-gray-300 rounded bg-white dark:bg-white text-[#696A78] dark:text-[#696A78]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Must match the email
              </p>
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <button
              className="w-full cursor-pointer bg-[#a60383] text-white py-2 px-4 rounded hover:bg-[#a60383] flex items-center justify-center dark:bg-[#a60383] dark:hover:bg-[#a60383]"
              onClick={handleUpdate}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Verify and Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
