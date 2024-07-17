"use client";
import Image from "next/image";
type ImagePropsType = {
  image: string;
  charName: string;
};

const EpisodeImage = ({ image, charName }: ImagePropsType) => {
  return <Image src={image} width={40} height={40} alt={charName} priority />;
};

export default EpisodeImage;
