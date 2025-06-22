import { PhotoDescriptionContainer } from "@/shared/ui/photo-description-container";
import Image from "next/image";

export const SecondPhotoView = () => {
  return (
    <PhotoDescriptionContainer
      title="두번째 웨딩 사진 컨테이너"
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
            우리가 맹세하는 자리에 오셔서
          </p>
          <p className="font-gowundodum text-center">축복을 빌어주세요!</p>
        </div>
      }
    />
  );
};
