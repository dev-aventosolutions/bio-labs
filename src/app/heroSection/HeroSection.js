import Image from "next/image";
import { useTranslation } from "../lib/translate";
import SectionWrapper from "../components/SectionWrapper";

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full">
      {/* Container with responsive image */}
      <div className="relative w-full">
        {/* Banner Image */}
        <Image
          src="/mainbanner.png"
          alt="Hero background"
          width={1440}
          height={700}
          priority
          className="w-full h-auto"
        />

        {/* Text Overlay - centered vertically, fixed left spacing */}
        <div className="absolute inset-0 flex items-center">
          <SectionWrapper 
            className="relative w-full"
            padding="py-0"
            customLeftPadding="pl-4 md:pl-0 lg:pl-0 xl:pl-0 2xl:pl-0"
            customRightPadding="pr-4 md:pr-0 lg:pr-0 xl:pr-0 2xl:pr-0"
          >
            <div className="w-full text-white">
              <div className="max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] 2xl:max-w-[50%]">
                <h1 className="font-black text-sm sm:text-[12px] md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[93.45px] leading-tight">
                  {t("hero.titlePart1")}
                  <span className="font-light">{t("hero.titlePart2")}</span>
                </h1>
                <p className="text-white text-[7px] sm:text-[8px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-[20.22px] mt-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                  {t("hero.subtitle")}
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </div>
    </section>
  );
}