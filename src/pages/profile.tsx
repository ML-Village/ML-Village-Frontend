"use client";

/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { ibm } from "@/styles/fonts";
import { API } from "@/utils/axios";
import { useAppStore } from "@/utils/store";
import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast from "react-hot-toast";

const mockData = [
  {
    id: "123",
    name: "GPT-888",
    description: "A GPT-2 model trained on 888 memes",
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
    name: "GPT-420",
    description: "A GPT-2 model trained on 420 memes",
    price: 192.47,
  },
];

const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  return hasHydrated;
};

export default function Profile() {
  const { apiKey } = useAppStore();
  const hasHydrated = useHasHydrated();
  const [filter, setFilter] = useState("");
  const [data, setData] = useState<any[]>([]);
  const filteredData = useMemo(() => {
    if (data.length <= 0) {
      return [];
    }
    if (filter) {
      return data.filter((model: any) =>
        model.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
    return data;
  }, [filter, data]);

  useEffect(() => {
    API.get(`/me/${apiKey}`)
      .then((res) => {
        const models = res.data.models.map((model: any, index: number) => {
          return {
            ...model,
            image:
              model.name === "GPT-888"
                ? "/assets/models/Model 0.png"
                : model.name === "GPT-6969"
                ? "/assets/models/Model 1.png"
                : model.name === "GPT-69420"
                ? "/assets/models/Model 2.png"
                : (model.name = "GPT-420"
                    ? "/assets/models/Model 3.png"
                    : `/assets/models/Model ${index % 4}.png`),
          };
        });
        setData(models);
      })
      .catch((err) => {
        console.log(err);
        setData(mockData);
        toast.error("API ding dong");
      });
  }, []);

  return (
    <main
      className={clsx(
        "flex flex-col min-w-full min-h-screen bg-brand-offwhite text-brand-text overflow-x-hidden overflow-y-auto relative",
        ibm.className
      )}
    >
      <Navbar />
      {hasHydrated ? (
        <div
          className={clsx(
            "flex flex-col min-w-full min-h-screen bg-brand-offwhite text-brand-text relative"
          )}
        >
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
                This is what you need to use your purchased models. Pass it in
                the API call within the header. Please keep this private.{" "}
              </p>
              <div className="inline-flex items-center gap-x-3 bg-brand-text rounded-lg px-4 py-2 w-full justify-between max-w-2xl">
                <pre
                  id="hs-clipboard-basic"
                  className="text-sm font-medium text-white"
                >
                  {apiKey}
                </pre>

                <CopyToClipboard
                  text={apiKey || ""}
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
                    <Link
                      href={`/models/${model.id}?purchased=true`}
                      key={model.id}
                    >
                      <div className="flex flex-col rounded-lg overflow-hidden drop-shadow-sm cursor-pointer">
                        <img src={model.image} alt={model.name} />
                        <div className="flex flex-col w-full h-full p-4 text-white gap-y-1 bg-brand-tertiary">
                          <p className="font-bold">{model.name}</p>
                          <p className="text-sm">{model.description}</p>
                          <p className="text-sm">
                            ${Number(model.price).toFixed(2)} per month
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
      ) : (
        <></>
      )}
    </main>
  );
}
