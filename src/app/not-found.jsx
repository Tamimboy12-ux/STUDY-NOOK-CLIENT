"use client";

import Link from "next/link";


export default function NotFound() {
  return (
    <div className=" min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">

      <div className="mx-auto text-center max-w-md">

        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          404 - Page Not Found
        </h1>

        <p className="text-gray-500 dark:text-gray-300 mt-3">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link href="/">
          <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
            Go Back Home
          </button>
        </Link>

      </div>

    </div>
  );
}