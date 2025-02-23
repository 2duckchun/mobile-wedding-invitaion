import { GuestCommentView } from "@/app/views/guest-comment-view";
import { IntroFamilyMemberView } from "@/app/views/intro-family-member-view";
import { MapView } from "@/app/views/map-view";
import { PhotoPartyView } from "@/app/views/photo-party-view";
import { WelcomeView } from "@/app/views/welcome-view";

export default function Home() {
  return (
    <div>
      <WelcomeView />
      <PhotoPartyView />
      <IntroFamilyMemberView />
      <MapView />
      <GuestCommentView />
    </div>
  );
}
