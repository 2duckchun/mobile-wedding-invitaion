import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Textarea } from "@/shared/ui/textarea";
import { Eraser } from "lucide-react";

export const GuestCommentView = () => {
  return (
    <article>
      <header>
        <h3 className="text-2xl font-bold text-center">방명록 🖊️</h3>
      </header>
      <section className="my-5 border p-3 space-y-5 shadow-sm rounded">
        <div className="bg-yellow-100 rounded shadow-inner px-4">
          <div className="divide-y divide-gray-300">
            <div className="py-2">
              <div className="flex">
                <p className="w-[95%]">
                  ㅇㅁㅇㄹㅁㄴㄹㅁㄴㅇㄹㄴㅇㄹㅁㄴㄹ
                  ㄴㄹㅁㄴㅇㄹㅁㄴㅇㄴㅇㄹㅁㄹㅁㄴㅇㄹㅁㄴㄹㅇㄹㄹㅇ
                </p>
                <div>
                  <Eraser />
                </div>
              </div>
              <div className="text-right text-sm ">
                <p>김태수</p>
                <p>25년 07월 03일</p>
              </div>
            </div>
            <div className="py-2">
              <div className="flex">
                <p className="w-[95%]">
                  ㅇㅁㅇㄹㅁㄴㄹㅁㄴㅇㄹㄴㅇㄹㅁㄴㄹ
                  ㄴㄹㅁㄴㅇㄹㅁㄴㅇㄴㅇㄹㅁㄹㅁㄴㅇㄹㅁㄴㄹㅇㄹㄹㅇ
                </p>
                <div>
                  <Eraser />
                </div>
              </div>
              <div className="text-right text-sm ">
                <p>김태수</p>
                <p>25년 07월 03일</p>
              </div>
            </div>
            <div className="py-2">
              <div className="flex">
                <p className="w-[95%]">
                  ㅇㅁㅇㄹㅁㄴㄹㅁㄴㅇㄹㄴㅇㄹㅁㄴㄹ
                  ㄴㄹㅁㄴㅇㄹㅁㄴㅇㄴㅇㄹㅁㄹㅁㄴㅇㄹㅁㄴㄹㅇㄹㄹㅇ
                </p>
                <div>
                  <Eraser />
                </div>
              </div>
              <div className="text-right text-sm ">
                <p>김태수</p>
                <p>25년 07월 03일</p>
              </div>
            </div>
            <div className="py-2">
              <div className="flex">
                <p className="w-[95%]">
                  ㅇㅁㅇㄹㅁㄴㄹㅁㄴㅇㄹㄴㅇㄹㅁㄴㄹ
                  ㄴㄹㅁㄴㅇㄹㅁㄴㅇㄴㅇㄹㅁㄹㅁㄴㅇㄹㅁㄴㄹㅇㄹㄹㅇ
                </p>
                <div>
                  <Eraser />
                </div>
              </div>
              <div className="text-right text-sm ">
                <p>김태수</p>
                <p>25년 07월 03일</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">페이지네이션</div>
        <div className="space-y-3">
          <div className="flex gap-4 w-full">
            <div className="w-full">
              <Label htmlFor="name">성함</Label>
              <Input placeholder="성함을 입력해주세요." id="name" />
            </div>
            <div className="w-full">
              <Label htmlFor="name">비밀번호</Label>
              <Input
                placeholder="비밀번호를 입력해주세요"
                type="password"
                id="name"
              />
            </div>
          </div>
          <div>
            <Textarea
              placeholder="응원의 한마디를 보내주세요!"
              className="resize-none"
            />
          </div>
        </div>
      </section>
    </article>
  );
};
