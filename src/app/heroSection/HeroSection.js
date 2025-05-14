import Image from "next/image";
import { useTranslation } from "../lib/translate";
import SectionWrapper from "../components/SectionWrapper";
import {BannerIcons, BannerMobileIcons} from "../components/Icons"
export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full">
      {/* Desktop / Tablet Banner */}
      <div className="relative hidden md:block w-full">
        <Image
          src="/mainbanner.png" // for medium and large screens
          alt="Hero background"
          width={1440}
          height={700}
          priority
          className="w-full h-auto object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center">
          <SectionWrapper
            className="relative w-full"
            padding="py-0"
            customLeftPadding="pl-4 md:pl-0"
            customRightPadding="pr-4 md:pr-0"
          >
            <div className="w-full text-white">
            <div className="max-w-[90%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] 2xl:max-w-[50%]">
  {/* Title Line */}
  <p className="font-black text-sm sm:text-[12px] md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[93.45px] leading-tight flex items-center flex-wrap">
    <span className="text-white">L</span>

    {/* Icon in the middle */}
    {/* <Image
      src={bannerIcons} // 🔁 Replace this with the actual icon path
      alt="Icon"
      width={40}
      height={40}
      className="w-[10px] sm:w-[12px] md:w-[40px] lg:w-[50px] xl:w-[60px] 2xl:w-[70px]"
    /> */}
<BannerIcons width="65.01px" height="69.40px" />

    <span className="text-white">B</span>
    <span className="font-light text-white">{t("hero.titlePart2")}</span>
  </p>

  {/* Subtitle */}
  <p className="text-white text-[7px] sm:text-[8px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-[20.22px] mt-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
    {t("hero.subtitle")}
  </p>
</div>

            </div>
          </SectionWrapper>
        </div>
      </div>

      {/* Mobile Banner */}
      <div className="relative block md:hidden w-full">
        <Image
          src="/mobilebanner.png" // for mobile screens
          alt="Hero background mobile"
          width={720}
          height={400}
          priority
          className="w-full h-auto object-cover"
        />

        {/* Text Overlay (same content) */}
        <div className="absolute top-[40%] left-0 right-0">
          <SectionWrapper
            className="relative w-full"
            padding="py-0"
            customLeftPadding="pl-4"
            customRightPadding="pr-4"
          >
            <div className="w-full text-white">
            <div className="max-w-[90%] ">
  {/* Title Line */}
  <p className="font-black text-[20px] sm:text-[20px] md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[93.45px] leading-tight flex items-center flex-wrap">
    <span className="text-white">L</span>

    {/* Icon in the middle */}
    {/* <Image
      src={bannerIcons} // 🔁 Replace this with the actual icon path
      alt="Icon"
      width={40}
      height={40}
      className="w-[10px] sm:w-[12px] md:w-[40px] lg:w-[50px] xl:w-[60px] 2xl:w-[70px]"
    /> */}
<BannerMobileIcons width="65.01px" height="69.40px" />

    <span className="text-white">B</span>
    <span className="font-light text-white">{t("hero.titlePart2")}</span>
  </p>

  {/* Subtitle */}
  <p className="text-white text-[10px] sm:text-[10px] md:text-lg lg:text-xl xl:text-2xl 2xl:text-[20.22px] mt-2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
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
