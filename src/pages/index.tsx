/* eslint-disable @next/next/no-img-element */
import { ibm } from "@/styles/fonts";
import clsx from "clsx";

export default function Home() {
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
          <button className="py-3 px-11 bg-brand-primary rounded-lg font-bold text-xl text-white">
            Start Exploring
          </button>
          <button className="py-3 px-11 bg-white rounded-lg font-bold text-xl text-brand-primary border border-brand-primary">
            Sell Your Models
          </button>
        </div>
      </div>
      <img
        className="w-[60vw] absolute h-auto -right-32 drop-shadow-xl z-10"
        src={"/assets/mockup.png"}
        alt="ML Village"
      />
      <img
        className="w-full absolute bottom-0 left-0"
        src={"/assets/gradient.png"}
        alt="ML Village"
      />
    </main>
  );
}
