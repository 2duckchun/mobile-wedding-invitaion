import { PhotoDescriptionContainer } from "@/shared/ui/photo-description-container";
import Image from "next/image";

export const SecondPhotoView = () => {
  return (
    <PhotoDescriptionContainer
      title="두번째 웨딩 사진 컨테이너"
      image={
        <div className="relative rounded-sm overflow-hidden h-[300px] bg-teal-200">
          <Image
            src="/images/wedding/garden.jpg"
            alt="결혼식 초대장"
            fill
            className="object-cover"
          />
        </div>
      }
      description={
        <div className="flex flex-col gap-1 space-y-4 mt-5">
          <div>
            <p className="font-gowundodum text-center">
              새로운 시작을 맞이하는
            </p>
            <p className="font-gowundodum text-center">
              지영이와 태수의 결혼식에
            </p>
            <p className="font-gowundodum text-center">당신을 초대합니다.</p>
          </div>

          <div>
            <p className="font-gowundodum text-center">
              우리가 맹세하는 자리에 오셔서
            </p>
            <p className="font-gowundodum text-center">축복을 빌어주세요!</p>
          </div>
        </div>
      }
    />
  );
};
