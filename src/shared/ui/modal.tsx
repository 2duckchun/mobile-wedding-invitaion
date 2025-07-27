"use client";

import { X } from "lucide-react";
import { ReactNode, useCallback, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showCloseButton?: boolean;
  closeButtonIcon?: ReactNode;
  closeOnOverlayClick?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  closeButtonIcon = <X className="w-5 h-5" />,
  showCloseButton = true,
  closeOnOverlayClick = true,
}: ModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  // 모달이 열려있을 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;

      // body에 overflow: hidden 적용
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // 키보드 이벤트 리스너 추가
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        // cleanup: body 스크롤 복원
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";

        // 스크롤 위치 복원
        window.scrollTo(0, scrollY);

        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* 닫기 버튼 */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="닫기"
          >
            {closeButtonIcon}
          </button>
        )}

        {/* 제목 */}
        {title && (
          <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
        )}

        {/* 컨텐츠 */}
        <div className="text-center">{children}</div>
      </div>
    </div>
  );
};

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const ContactModal = ({
  isOpen,
  onClose,
  children,
}: ContactModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="연락처">
      {children}
    </Modal>
  );
};
