import { Button, Card } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

const Banner = () => {

    return (
        <section className="bg-[#0F172A] text-white px-6 py-20">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

                <div>
                    <h1 className="text-5xl font-bold leading-tight">
                        Find Your Perfect
                        Study Room
                    </h1>
                    <p className="text-gray-300 mt-5">
                        Browse and book quiet, private study rooms
                        in your library. List your own room and earn.
                    </p>
                    <div className="flex gap-4 mt-8">

                        <Link href="/rooms">
                            <Button variant="primary" className="rounded-md">
                                Explore Rooms
                            </Button>
                        </Link>

                        <Link href="/add-room">
                            <Button variant="bordered">
                                Add Room
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card className="bg-[#111827] p-4">
                    <Image
                        src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200"
                        alt="Study Room"
                        width={700}
                        height={400}
                        priority
                        className="rounded-xl h-90 w-full object-cover"
                    />
                </Card>
            </div>
        </section>
    );
};

export default Banner;