import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";


const Footer = () => {

    return (

        <footer className="bg-[#0F172A] text-white px-6 pt-12 pb-6">

            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
                <div>
                    <h2 className="text-2xl font-bold text-indigo-400">
                        StudyNook
                    </h2>
                    <p className="mt-3 text-gray-300">
                        Book quiet and comfortable
                        study rooms anytime.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold mb-3">
                        Useful Links
                    </h3>
                    <div className="flex flex-col gap-2">
                        <Link href="/">
                            Home
                        </Link>

                        <Link href="/rooms">
                            Rooms
                        </Link>
                        <Link href="/about">
                            About
                        </Link>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold mb-3">
                        Contact
                    </h3>
                    <p>
                        Email: borshasabikunbashar@gmail.com
                    </p>
                    <p>
                        Phone: +880123456789
                    </p>
                    <div className="flex gap-5 mt-5">
                        <FaFacebook
                            className="w-6 h-6 cursor-pointer hover:text-indigo-400"
                        />
                        <FaTwitter
                            className="w-6 h-6 cursor-pointer hover:text-indigo-400"
                        />
                        <FaLinkedin
                            className="w-6 h-6 cursor-pointer hover:text-indigo-400"
                        />
                        <FaInstagram
                            className="w-6 h-6 cursor-pointer hover:text-indigo-400"
                        />
                    </div>

                </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">

                © 2026 StudyNook. All rights reserved.

            </div>
        </footer>
    );
};

export default Footer;