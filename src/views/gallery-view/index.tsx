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
      src: "/images/gallery/001.jpg",
      alt: "Wedding photo 1",
    },
    {
      src: "/images/gallery/002.jpg",
      alt: "Wedding photo 2",
    },
    {
      src: "/images/gallery/003.jpg",
      alt: "Wedding photo 3",
    },
    {
      src: "/images/gallery/004.jpg",
      alt: "Wedding photo 4",
    },
    {
      src: "/images/gallery/005.jpg",
      alt: "Wedding photo 5",
    },
    {
      src: "/images/gallery/006.jpg",
      alt: "Wedding photo 6",
    },
    {
      src: "/images/gallery/007.jpg",
      alt: "Wedding photo 7",
    },
    {
      src: "/images/gallery/008.jpg",
      alt: "Wedding photo 8",
    },
    {
      src: "/images/gallery/009.jpg",
      alt: "Wedding photo 9",
    },
    {
      src: "/images/gallery/010.jpg",
      alt: "Wedding photo 10",
    },
    {
      src: "/images/gallery/011.jpg",
      alt: "Wedding photo 11",
    },
    {
      src: "/images/gallery/012.jpg",
      alt: "Wedding photo 12",
    },
    {
      src: "/images/gallery/013.jpg",
      alt: "Wedding photo 13",
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
