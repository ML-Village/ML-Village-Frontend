"use client";

/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { ibm } from "@/styles/fonts";
import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

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
  const [filter, setFilter] = useState("");
  const filteredData = useMemo(() => {
    if (filter) {
      return mockData.filter((model) =>
        model.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return mockData;
  }, [filter]);

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
            <p className="font-bold cursor-pointer">Purchased Models</p>
            <p className="font-bold opacity-50 cursor-pointer">API Keys</p>
            <p className="font-bold opacity-50 cursor-pointer">
              Usage Statistics
            </p>
          </div>
          <div className="flex flex-col basis-4/5 px-8 py-11">
            <p className="font-bold text-2xl mb-3">Your API Key</p>
            <p className="mb-5">
              This is what you need to use your purchased models. Pass it in the
              API call within the header. Please keep this private.{" "}
            </p>
            <div className="inline-flex items-center gap-x-3 bg-brand-text rounded-lg px-4 py-2 w-full justify-between max-w-lg">
              <pre
                id="hs-clipboard-basic"
                className="text-sm font-medium text-white"
              >
                {apiKey}
              </pre>

              <CopyToClipboard
                text={apiKey}
                onCopy={() => toast.success("Copied to clipboard!")}
              >
                <button
                  type="button"
                  className="js-clipboard p-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border  bg-slate-900 border-gray-700 text-white hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-600 shadow-sm disabled:opacity-50 disabled:pointer-events-none"
                  data-clipboard-target="#hs-clipboard-basic"
                  data-clipboard-action="copy"
                  data-clipboard-success-text="Copied"
                >
                  <svg
                    className="js-clipboard-default w-4 h-4 group-hover:rotate-6 transition"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  </svg>

                  <svg
                    className="js-clipboard-success hidden w-4 h-4 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              </CopyToClipboard>
            </div>
            <div className="flex flex-row w-full items-center justify-between mb-11 mt-12">
              <p className="font-bold text-2xl">Your Purchased Models</p>
              <div className="relative py-1 px-4 max-w-md w-full bg-white flex flex-row border border-brand-secondary rounded-lg text-sm focus:border-brand-primary focus:ring-brand-primary disabled:opacity-50 disabled:pointer-events-none">
                <img
                  src="/assets/icons/search.svg"
                  alt="Search"
                  className="w-4"
                />
                <input
                  type="text"
                  id="input-label"
                  className="border-transparent focus:ring-0 w-full focus:outline-none border-none"
                  placeholder="Search for a model"
                  onChange={(e) => setFilter(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="grid grid-cols-4 w-full gap-x-6">
              {filteredData.map((model, index) => {
                return (
                  <Link href={`/models/${model.id}`} key={model.id}>
                    <div className="flex flex-col rounded-lg overflow-hidden drop-shadow-sm cursor-pointer">
                      <img
                        src={`/assets/models/Model ${index}.png`}
                        alt={model.name}
                      />
                      <div className="flex flex-col w-full h-full p-4 text-white gap-y-1 bg-brand-tertiary">
                        <p className="font-bold">{model.name}</p>
                        <p className="text-sm">{model.description}</p>
                        <p className="text-sm">
                          ${model.price.toFixed(2)} per month
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
