import Banner from "@/components/home/Banner";
import LatestRooms from "@/components/home/LatestRooms";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";


export const metadata = {
  title: "StudyNook - Home",
  description:
    "Find and book private study rooms in libraries. List your own rooms and manage bookings easily.",
};


export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <LatestRooms></LatestRooms>
      <WhyChooseUs></WhyChooseUs>
      <Testimonials></Testimonials>
    </div>
  );
}
