import React from "react";

export default function SectionWrapper({
  children,
  className = "",
  padding = "py-4 md:py-6",
  disablePadding = false,
  customRightPadding = "",
  customLeftPadding = "",
}) {
  const leftPadding = disablePadding
    ? ""
    : customLeftPadding || "pl-4 md:pl-12 lg:pl-12 xl:pl-12 2xl:pl-0";

  const rightPadding = disablePadding
    ? ""
    : customRightPadding || "pr-4 md:pr-12 lg:pr-12 xl:pr-12 2xl:pr-0";

  return (
    <div
      className={`w-full mx-auto max-w-screen-xl ${leftPadding} ${rightPadding} ${padding} ${className}`}
    >
      {children}
    </div>
  );
}
