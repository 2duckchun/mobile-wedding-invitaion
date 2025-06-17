import { PhotoDescriptionContainer } from "@/app/shared/ui/photo-description-container";
import Image from "next/image";

export const FirstPhotoView = () => {
  return (
    <PhotoDescriptionContainer
      title="첫번째 웨딩 사진 컨테이너"
      image={
        <div className="relative h-[300px] bg-teal-200">
          <Image
            src="/images/wedding/garden.jpg"
            alt="결혼식 초대장"
            fill
            className="object-cover"
          />
        </div>
      }
      description={
        <div className="flex flex-col gap-1 my-5">
          <p className="font-gowundodum text-center">
            서로를 너무나도 사랑하는 우리.
          </p>
          <p className="font-gowundodum text-center">
            앞으로 더 사랑하고자 백년가약을 맺었습니다.
          </p>
        </div>
      }
    />
  );
};
