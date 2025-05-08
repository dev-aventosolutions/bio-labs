import Image from "next/image";
import { useTranslation } from "../lib/translate";
import SectionWrapper from "../components/SectionWrapper";

export default function HeroSection() {
  const { t } = useTranslation();

  const images = [
    "/pic.png",
    "/pic2.png",
    "/pic3.png",
    "/pic4.png",
    "/pic5.png",
    "/pic6.png",
    "/pic7.png",
    "/pic8.png",
   
  ];

  return (
    <section className="bg-gradient-to-r bg-[url('/bg.png')] bg-cover bg-center relative overflow-hidden">
      <SectionWrapper pr="md:pr-4 pr-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Text Content - now takes full width on medium screens, half on large */}
          <div className="lg:w-1/2 xl:w-[45%] order-1 lg:order-none">
            <div className="text-white mb-4">
              <h1 className="font-black text-5xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[93.45px] leading-tight">
                {t("hero.titlePart1")}
                <span className="font-light">{t("hero.titlePart2")}</span>
              </h1>
            </div>
            <p className="text-white text-[20.22px] md:text-[20.22px] max-w-lg">
              {t("hero.subtitle")}
            </p>
          </div>
          
          {/* Images Grid - now takes full width on medium screens, half on large */}
          <div className="lg:w-[182] hlg:h-[99] xl:w-[55%] grid grid-cols-2 sm:grid-cols-4 opacity-80 order-2 lg:order-none">
            {images.map((imgSrc, index) => (
              <div 
                key={index} 
                className="aspect-[182/99] overflow-hidden relative hover:opacity-100 transition-opacity"
              >
                <Image
                  src={imgSrc}
                  alt={t("hero.imageAlt", { number: index + 1 })}
                  width={182}
                  height={99}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}