import { StaticImageData } from "next/image";
import Image from "next/image";

interface HeroProps {
  imgDate: StaticImageData;
  imgAlt: string;
  title: string;
}

export default function Hero(props: HeroProps) {
  return (
    <div className="relative h-screen">
      <div className="absolute -z-10 inset-0">
        <Image
          src={props.imgDate}
          alt={props.imgAlt}
          fill
          // fill = to expand the img as much as possible to its parent component (div) so we don't have to face "content shifting".
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900" />
      </div>
      <div className="pt-48 flex justify-center items-center">
        <h1 className="text-white text-6xl">{props.title}</h1>
      </div>
    </div>
  );
}
