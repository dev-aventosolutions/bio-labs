import React from "react";

export default function SectionWrapper({
  children,
  className = "",
  padding = "py-4 md:py-6",
  disablePadding = false,
  customRightPadding = "", // 👈 allow custom pr
}) {
  const defaultLeftPadding = disablePadding
    ? ""
    : "pl-4 sm:pl-6 md:pl-10 lg:pl-16 xl:pl-24 2xl:pl-32 3xl:pl-48";

  const defaultRightPadding = disablePadding
    ? ""
    : "pr-4 sm:pr-6 md:pr-10 lg:pr-16 xl:pr-24 2xl:pr-32 3xl:pr-48";

  return (
    <div
      className={`w-full ${defaultLeftPadding} ${customRightPadding || defaultRightPadding} ${padding} ${className} mx-auto max-w-screen-xl`}
    >
      {children}
    </div>
  );
}
