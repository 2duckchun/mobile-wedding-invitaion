import { Modal } from "@/shared/ui/modal";
import Image from "next/image";

export const MiniMapModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton>
      <div className="rounded-lg max-w-md w-full p-8">
        <div className="relative h-[500px]">
          <Image
            src="/images/wedding/mini-map.jpg"
            alt="결혼식 초대장"
            fill
            className="object-contain rounded-lg"
          />
        </div>
      </div>
    </Modal>
  );
};
