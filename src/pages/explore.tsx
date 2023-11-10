/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { ibm } from "@/styles/fonts";
import clsx from "clsx";
import Link from "next/link";

export default function Explore() {
  return (
    <main
      className={clsx(
        "flex flex-col min-w-full min-h-screen bg-brand-offwhite text-brand-text items-center overflow-hidden relative",
        ibm.className
      )}
    >
      <Navbar />
      <div
        className={clsx(
          "flex flex-row min-w-full min-h-screen bg-brand-offwhite text-brand-text items-center px-24 overflow-hidden relative"
        )}
      >
        <div className="flex flex-col items-start">
          <h1 className="font-bold text-5xl mb-4">ML Village</h1>
          <p className="text-xl mb-12 max-w-xl">
            The world&apos;s first ZKML service provider. Providing users with
            access to trustable machine learning models while ensuring model
            privacy.
          </p>
          <div className="flex flex-row items-center justify-center gap-x-5">
            <Link href="/explore">
              <button className="py-3 px-11 bg-brand-primary rounded-lg font-bold text-xl text-white">
                Start Exploring
              </button>
            </Link>
            <Link href="/sell">
              <button className="py-3 px-11 bg-white rounded-lg font-bold text-xl text-brand-primary border border-brand-primary">
                Sell Your Models
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
