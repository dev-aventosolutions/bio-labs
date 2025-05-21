import React from "react";

export default function SectionWrapper({
  children,
  className = "",
  padding = "pt-4 md:pt-4",
  disablePadding = false,
  customRightPadding = "",
  customLeftPadding = "",
}) {
  const leftPadding = disablePadding
    ? ""
    : customLeftPadding || "pl-4 md:pl-0 lg:pl-0 xl:pl-0 2xl:pl-0";

  const rightPadding = disablePadding
    ? ""
    : customRightPadding || "pr-4 md:pr-0 lg:pr-0 xl:pr-0 2xl:pr-0";

  return (
    <div
      className={`w-full mx-auto max-w-screen-xl ${leftPadding} ${rightPadding} ${padding} ${className}`}
    >
      {children}
    </div>
  );
}
// md:pr-12 lg:pr-12 xl:pr-12 2xl:pr-0