import { GalleryView } from "@/views/gallery-view";
import { IntroFamilyMemberView } from "@/views/intro-family-member-view";
import { MapView } from "@/views/map-view";
import { WelcomeView } from "@/views/welcome-view";
import { SecondPhotoView } from "@/views/second-photo-view";
import { BlessingAccountView } from "@/views/blessing-account-view";
import { CalendarView } from "@/views/calendar-view";
import { ViewSeperator } from "@/shared/ui/view-seperator";
import { WhereAndHowWeddingView } from "@/views/where-and-how-wedding";
import { GuestbookMessageView } from "@/views/guestbook-message-view";

export default function Home() {
  return (
    <div>
      <WelcomeView />
      <WhereAndHowWeddingView />
      <ViewSeperator />
      <SecondPhotoView />
      <ViewSeperator />
      <IntroFamilyMemberView />
      <ViewSeperator />
      <CalendarView />
      <ViewSeperator isTransparent />
      <MapView />
      <ViewSeperator />
      <BlessingAccountView />
      <ViewSeperator />
      <GalleryView />
      <ViewSeperator />
      <GuestbookMessageView />
    </div>
  );
}
