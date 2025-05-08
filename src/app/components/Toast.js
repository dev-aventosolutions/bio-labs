"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function Toast({ message, type = "success" }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div
        className={`flex items-center p-4 rounded-md shadow-lg ${
          type === "success"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {type === "success" ? (
          <CheckCircle2 className="h-5 w-5 mr-2" />
        ) : (
          <XCircle className="h-5 w-5 mr-2" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
}