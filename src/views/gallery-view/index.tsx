"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageDetailModal } from "./image-detail-modal";

interface GalleryImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

const GalleryImage = ({ src, alt, onClick }: GalleryImageProps) => {
  return (
    <div className="aspect-square bg-gray-200 relative overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        fill
        className="cursor-pointer object-cover transition-transform duration-300 hover:scale-110"
        onClick={onClick}
      />
    </div>
  );
};

export const GalleryView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const galleryImages = [
    {
      src: "https://cdn.pixabay.com/photo/2019/12/26/10/44/horse-4720178_1280.jpg",
      alt: "Wedding photo 1",
    },
    {
      src: "https://cdn.pixabay.com/photo/2017/04/03/00/16/shire-horse-2197214_1280.jpg",
      alt: "Wedding photo 2",
    },
    {
      src: "https://cdn.pixabay.com/photo/2015/10/25/21/25/horse-1006376_1280.jpg",
      alt: "Wedding photo 3",
    },
    {
      src: "https://cdn.pixabay.com/photo/2016/01/14/00/26/horse-1139142_1280.jpg",
      alt: "Wedding photo 4",
    },
    {
      src: "https://cdn.pixabay.com/photo/2016/01/14/00/26/horse-1139142_1280.jpg",
      alt: "Wedding photo 5",
    },
    {
      src: "https://cdn.pixabay.com/photo/2019/03/09/17/30/horse-4044547_1280.jpg",
      alt: "Wedding photo 6",
    },
    {
      src: "https://cdn.pixabay.com/photo/2016/11/06/22/58/horse-1804425_1280.jpg",
      alt: "Wedding photo 7",
    },
    {
      src: "https://cdn.pixabay.com/photo/2014/12/04/23/05/horse-557261_1280.jpg",
      alt: "Wedding photo 8",
    },
    {
      src: "https://cdn.pixabay.com/photo/2014/08/15/22/48/cowgirl-419084_1280.jpg",
      alt: "Wedding photo 9",
    },
  ];

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <article>
      <header>
        <h3 className="text-2xl font-bold text-center">갤러리 📷</h3>
      </header>
      <section className="flex flex-col gap-4 my-5">
        <div className="grid grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <GalleryImage
              key={index}
              src={image.src}
              alt={image.alt}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      </section>

      {/* 이미지 상세 모달 */}
      <ImageDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={galleryImages}
        initialIndex={selectedImageIndex}
      />
    </article>
  );
};
