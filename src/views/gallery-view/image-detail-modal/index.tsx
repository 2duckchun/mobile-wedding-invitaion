import { Modal } from "@/shared/ui/modal";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const [dragOffset, setDragOffset] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  // initialIndex가 변경될 때 currentIndex 업데이트
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // 터치 이벤트 핸들러 (모바일)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setDragOffset(0);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      setTouchEnd(e.touches[0].clientX);

      if (touchStart) {
        const offset = e.touches[0].clientX - touchStart;
        setDragOffset(offset * 0.3);
      }
    },
    [touchStart]
  );

  const handleTouchEnd = useCallback(() => {
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
    setDragOffset(0);
  }, [touchStart, touchEnd, goToNext, goToPrevious]);

  // 마우스 이벤트 핸들러 (데스크탑)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    console.log("Mouse down - setting isDragging to true");
    setIsDragging(true);
    setMouseStart(e.clientX);
    setDragOffset(0);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      console.log("Mouse move - isDragging:", isDragging);
      e.preventDefault();
      setMouseEnd(e.clientX);

      if (mouseStart) {
        const offset = e.clientX - mouseStart;
        setDragOffset(offset * 0.3);
      }
    },
    [isDragging, mouseStart]
  );

  const handleMouseUp = useCallback(() => {
    console.log("Mouse up - isDragging:", isDragging);
    if (!isDragging) return;
    if (!mouseStart || !mouseEnd) {
      console.log("Click detected - no drag");
      setIsDragging(false);
      setMouseStart(null);
      setMouseEnd(null);
      setDragOffset(0);
      return;
    }

    const distance = mouseStart - mouseEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    console.log("Drag detected - distance:", distance);

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setIsDragging(false);
    setMouseStart(null);
    setMouseEnd(null);
    setDragOffset(0);
  }, [isDragging, mouseStart, mouseEnd, goToNext, goToPrevious]);

  const handleMouseLeave = useCallback(() => {
    console.log("Mouse leave - isDragging:", isDragging);
    if (isDragging) {
      setIsDragging(false);
      setMouseStart(null);
      setMouseEnd(null);
      setDragOffset(0);
    }
  }, [isDragging]);

  // 키보드 이벤트 리스너 추가
  useEffect(() => {
    const handleKeyDownEvent = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDownEvent);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, [isOpen, goToPrevious, goToNext, onClose]);

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <div className="relative bg-black rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
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
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => console.log("Image container clicked!")}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain pointer-events-none transition-transform duration-75"
            style={{ transform: `translateX(${dragOffset}px)` }}
            priority
          />
        </div>

        {/* 네비게이션 버튼 */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 bottom-20 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          aria-label="이전 이미지"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 bottom-20 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          aria-label="다음 이미지"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* 이미지 정보 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-10">
          <div className="text-center">
            <p className="text-white text-lg font-medium">{currentImage.alt}</p>
            <p className="text-gray-300 text-sm mt-1">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
