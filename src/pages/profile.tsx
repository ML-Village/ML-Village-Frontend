/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { ibm } from "@/styles/fonts";
import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

const mockData = [
  {
    id: "123",
    name: "GPT-420",
    description: "A GPT-2 model trained on 420 memes",
    price: 42,
  },
  {
    id: "456",
    name: "GPT-6969",
    description: "A GPT-2 model trained on 6969 memes",
    price: 12,
  },
  {
    id: "789",
    name: "GPT-69420",
    description: "A GPT-2 model trained on 69420 memes",
    price: 31,
  },
  {
    id: "101112",
    name: "GPT-888",
    description: "A GPT-2 model trained on 888 memes",
    price: 192.47,
  },
];

export default function Profile() {
  const [apiKey, setApiKey] = useState("askdajsd");
  const filter = (value: string) => {
    // Do nothing for now
  };

  return (
    <main
      className={clsx(
        "flex flex-col min-w-full min-h-screen bg-brand-offwhite text-brand-text overflow-x-hidden overflow-y-auto relative",
        ibm.className
      )}
    >
      <Navbar />
      <div
        className={clsx(
          "flex flex-col min-w-full min-h-screen bg-brand-offwhite text-brand-text relative"
        )}
      >
        <div className="flex flex-col w-full justify-center py-16 px-60 relative bg-banner bg-cover">
          <p className="font-bold text-4xl text-white mb-4">
            Find the perfect model for you
          </p>
          <p className="text-white z-10 max-w-4xl">
            Whether you need a basic classification ML model or something more
            advanced, we&apos;ve got it for you. Just select the model of choice
            and use it. Everything else is handled by us.
          </p>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col basis-1/5 items-start px-10 py-9 border-r border-brand-text/25 h-full min-h-[80vh] flex-grow gap-y-5">
            <p className="font-bold">Purchased Models</p>
            <p className="font-bold opacity-50">API Keys</p>
            <p className="font-bold opacity-50">Usage Statistics</p>
          </div>
          <div className="flex flex-col basis-4/5 px-8 py-11">
            <p className="font-bold text-2xl mb-3">Your API Key</p>
            <p>
              This is what you need to use your purchased models. Pass it in the
              API call within the header. Please keep this private.{" "}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
