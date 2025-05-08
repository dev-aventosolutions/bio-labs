import React from "react";

export default function SectionWrapper({
  children,
  className = "",
  padding = "md:py-8 py-4",
  pr = "", 
}) {
  const defaultLeftPadding = "md:pl-16 pl-4";
  const defaultRightPadding = pr ? pr : "md:pr-16 pr-4"; 

  return (
    <div className={`w-full mx-auto ${defaultLeftPadding} ${defaultRightPadding} ${padding} ${className}`}>
      {children}
    </div>
  );
}
