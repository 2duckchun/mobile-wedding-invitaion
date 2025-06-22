import { GuestCommentView } from "@/views/guest-comment-view";
import { IntroFamilyMemberView } from "@/views/intro-family-member-view";
import { MapView } from "@/views/map-view";
import { WelcomeView } from "@/views/welcome-view";
import { FirstPhotoView } from "@/views/first-photo-view";
import { SecondPhotoView } from "@/views/second-photo-view";

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
