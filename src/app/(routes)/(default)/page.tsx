import { GuestCommentView } from "@/app/views/guest-comment-view";
import { IntroFamilyMemberView } from "@/app/views/intro-family-member-view";
import { MapView } from "@/app/views/map-view";
import { WelcomeView } from "@/app/views/welcome-view";
import { FirstPhotoView } from "@/app/views/first-photo-view";
import { SecondPhotoView } from "@/app/views/second-photo-view";

export default function Home() {
  return (
    <div>
      <WelcomeView />
      <FirstPhotoView />
      <SecondPhotoView />
      <MapView />
      <IntroFamilyMemberView />
      <GuestCommentView />
    </div>
  );
}
