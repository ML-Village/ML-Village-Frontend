/* eslint-disable @next/next/no-img-element */
import { ibm } from "@/styles/fonts";
import { useAppStore } from "@/utils/store";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { setApiKey } = useAppStore();
  useEffect(() => {
    setApiKey(
      "4f842463efd9c0a799cfee89341ca893db7fd0fe776f15381acdf5c2d47a49e2"
    );
  }, []);

  return (
    <main
      className={clsx(
        "flex flex-row min-w-full min-h-screen bg-brand-offwhite text-brand-text items-center px-24 bg-hero bg-cover overflow-hidden relative",
        ibm.className
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
      <img
        className="w-[60vw] absolute h-auto -right-32 drop-shadow-xl z-10 pointer-events-none"
        src={"/assets/mockup.png"}
        alt="ML Village"
      />
      <img
        className="w-full absolute bottom-0 left-0 pointer-events-none"
        src={"/assets/gradient.png"}
        alt="ML Village"
      />
    </main>
  );
}
