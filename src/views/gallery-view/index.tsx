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
      alt: "수줍은 태수와 지영입니다.",
    },
    {
      src: "/images/gallery/002.jpg",
      alt: "저와 결혼해주세요!",
    },
    {
      src: "/images/gallery/003.jpg",
      alt: "가끔 와인도 한잔 하고요.",
    },
    {
      src: "/images/gallery/004.jpg",
      alt: "고급스럽게도 다닌답니다.",
    },
    {
      src: "/images/gallery/005.jpg",
      alt: "우리 부부는 책을 좋아해요.",
    },
    {
      src: "/images/gallery/006.jpg",
      alt: "행복",
    },
    {
      src: "/images/gallery/007.jpg",
      alt: "사랑",
    },
    {
      src: "/images/gallery/008.jpg",
      alt: "귀염",
    },
    {
      src: "/images/gallery/009.jpg",
      alt: "둘이 함께 만든 멋진 사랑입니다.",
    },
    {
      src: "/images/gallery/010.jpg",
      alt: "서로와 함께 풍성하게 넘치는 삶!",
    },
    {
      src: "/images/gallery/011.jpg",
      alt: "11월 22일에 새로이 시작합니다!",
    },
    {
      src: "/images/gallery/012.jpg",
      alt: "신랑이 넣고싶어서 넣은 사진 1",
    },
    {
      src: "/images/gallery/013.jpg",
      alt: "신랑이 넣고싶어서 넣은 사진 2",
    },
    {
      src: "/images/gallery/014.jpg",
      alt: "우리, 아름답고 즐겁게 살겠습니다!",
    },
    {
      src: "/images/gallery/015.jpg",
      alt: "축복해주셔서 감사합니다!",
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
