import { Card } from "@heroui/react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "University Student",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",

    review:
      "StudyNook helped me find quiet study spaces during exams. Booking is quick and simple.",
  },

  {
    id: 2,
    name: "David Hasan",
    role: "Computer Science Student",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",

    review:
      "The platform saved me a lot of time and made room booking effortless.",
  },

  {
    id: 3,
    name: "Emma Noor",
    role: "Library Member",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",

    review:
      "Very clean UI and easy booking experience. I use it regularly.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            What Students Say
          </h1>
          <p className="text-gray-500 mt-4">
            Experiences shared by students and users
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {testimonials.map((item) => (
            <Card
              key={item.id}
              className="p-6"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  priority
                  className="rounded-full object-cover w-[60px] h-[60px]"
                />
                <div>
                  <h2 className="font-bold">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>
              <p className="mt-6 text-gray-600">
                {item.review}
              </p>
              <div className="mt-5 text-yellow-400 flex gap-1">
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;