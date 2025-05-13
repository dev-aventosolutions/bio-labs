import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full">
      <div className="w-full h-auto">
        <Image
          src="/banner.png"
          alt="Labos Space Banner"
          width={1920}  // Set to your image's actual width
          height={1080}  // Set to your image's actual height
          layout="responsive"
          quality={100}
          priority
        />
      </div>
    </section>
  );
}