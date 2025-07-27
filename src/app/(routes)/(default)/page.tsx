import { GalleryView } from "@/views/gallery-view";
import { IntroFamilyMemberView } from "@/views/intro-family-member-view";
import { MapView } from "@/views/map-view";
import { WelcomeView } from "@/views/welcome-view";
import { FirstPhotoView } from "@/views/first-photo-view";
import { SecondPhotoView } from "@/views/second-photo-view";
import { BlessingAccountView } from "@/views/blessing-account-view";
import { CalendarView } from "@/views/calendar-view";
import { ViewSeperator } from "@/shared/ui/view-seperator";
import { GuestCommentView } from "@/views/guest-comment-view";

export default function Home() {
  return (
    <div>
      <WelcomeView />
      <FirstPhotoView />
      <SecondPhotoView />
      <ViewSeperator />
      <IntroFamilyMemberView />
      <ViewSeperator />
      <CalendarView />
      <ViewSeperator />
      <MapView />
      <ViewSeperator />
      <BlessingAccountView />
      <ViewSeperator />
      <GalleryView />
      <ViewSeperator />
      <GuestCommentView />
    </div>
  );
}
