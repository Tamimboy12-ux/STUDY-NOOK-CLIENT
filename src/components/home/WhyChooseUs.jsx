import { Card } from "@heroui/react";
import { FcAlarmClock } from "react-icons/fc";
import { ImPower } from "react-icons/im";
import { IoBookSharp } from "react-icons/io5";

const features = [
  {
    id: 1,
    icon: <IoBookSharp className="text-green-500"/>,
    title: "Quiet Study Spaces",
    description:
      "Find distraction-free environments designed for productive study sessions.",
  },

  {
    id: 2,
    icon: <ImPower className="text-orange-500" />,
    title: "Easy Booking",
    description:
      "Reserve your preferred room instantly with a simple booking process.",
  },

  {
    id: 3,
    icon: <FcAlarmClock />,
    title: "Flexible Schedule",
    description:
      "Choose study times that fit your daily routine and academic goals.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Why Choose StudyNook?
          </h1>
          <p className="text-gray-500 mt-4">
            Study smarter with comfortable rooms and seamless booking.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="p-8 text-center hover:-translate-y-2 transition"
            >
              <div className="text-5xl mx-auto">
                {feature.icon}
              </div>
              <h2 className="text-2xl font-bold mt-5">
                {feature.title}
              </h2>
              <p className="text-gray-500 mt-4">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

    </section>
  );
};

export default WhyChooseUs;