// app/not-found.tsx
import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Ashish Sigdel",
};

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <main className="flex flex-col items-center justify-center px-4 sm:px-0">
        <h1 className="text-5xl font-bold text-gray-300">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-400">
          Page Not Found
        </h2>
        <p className="mt-4 text-gray-400">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="mt-8">
          <button>Go Back to Home</button>
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
