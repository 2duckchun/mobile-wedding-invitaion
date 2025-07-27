import { Modal } from "@/shared/ui/modal";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ImageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ src: string; alt: string }>;
  initialIndex: number;
}

export const ImageDetailModal = ({
  isOpen,
  onClose,
  images,
  initialIndex,
}: ImageDetailModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [mouseStart, setMouseStart] = useState<number | null>(null);
  const [mouseEnd, setMouseEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  // initialIndex가 변경될 때 currentIndex 업데이트
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  // 터치 이벤트 핸들러 (모바일)
  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    e.preventDefault();

    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // 마우스 이벤트 핸들러 (데스크탑)
  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setMouseStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setMouseEnd(e.clientX);
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    if (!mouseStart || !mouseEnd) return;

    const distance = mouseStart - mouseEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setIsDragging(false);
    setMouseStart(null);
    setMouseEnd(null);
  };

  // 이벤트 리스너 추가
  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    // 터치 이벤트 (모바일)
    imageElement.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    imageElement.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    imageElement.addEventListener("touchend", handleTouchEnd, {
      passive: false,
    });

    // 마우스 이벤트 (데스크탑)
    imageElement.addEventListener("mousedown", handleMouseDown);
    imageElement.addEventListener("mousemove", handleMouseMove);
    imageElement.addEventListener("mouseup", handleMouseUp);
    imageElement.addEventListener("mouseleave", handleMouseUp);

    return () => {
      imageElement.removeEventListener("touchstart", handleTouchStart);
      imageElement.removeEventListener("touchmove", handleTouchMove);
      imageElement.removeEventListener("touchend", handleTouchEnd);
      imageElement.removeEventListener("mousedown", handleMouseDown);
      imageElement.removeEventListener("mousemove", handleMouseMove);
      imageElement.removeEventListener("mouseup", handleMouseUp);
      imageElement.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [touchStart, touchEnd, mouseStart, mouseEnd, isDragging]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <div className="relative bg-black rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* 이미지 */}
        <div
          ref={imageRef}
          className={`relative w-full h-[70vh] ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain pointer-events-none"
            priority
          />
        </div>

        {/* 네비게이션 버튼 */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 bottom-20 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          aria-label="이전 이미지"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 bottom-20 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          aria-label="다음 이미지"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* 이미지 정보 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="text-center">
            <p className="text-white text-lg font-medium">{currentImage.alt}</p>
            <p className="text-gray-300 text-sm mt-1">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>

        {/* 키보드 이벤트 리스너 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('keydown', ${handleKeyDown.toString()});
            `,
          }}
        />
      </div>
    </Modal>
  );
};
