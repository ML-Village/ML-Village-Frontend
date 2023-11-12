/* eslint-disable @next/next/no-img-element */
import Navbar from "@/components/Navbar";
import { ibm } from "@/styles/fonts";
import { API } from "@/utils/axios";
import { useAppStore } from "@/utils/store";
import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";

const mockData = [
  {
    id: "123",
    name: "GPT-888",
    description: "A GPT-2 model trained on 888 memes",
    price: "42",
    image: "/assets/models/Model 0.png",
  },
  {
    id: "456",
    name: "GPT-6969",
    description: "A GPT-2 model trained on 6969 memes",
    price: "12",
    image: "/assets/models/Model 1.png",
  },
  {
    id: "789",
    name: "GPT-69420",
    description: "A GPT-2 model trained on 69420 memes",
    price: "31",
    image: "/assets/models/Model 2.png",
  },
  {
    id: "101112",
    name: "GPT-420",
    description: "A GPT-2 model trained on 420 memes",
    price: "192.47",
    image: "/assets/models/Model 4.png",
  },
];

export default function Explore() {
  const [filter, setFilter] = useState("");
  const { setModels } = useAppStore();
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
    API.get("/models")
      .then((res) => {
        const models = res.data.map((model: any, index: number) => {
          return {
            ...model,
            image: `/assets/models/Model ${index % 4}.png`,
          };
        });
        setData(models);
        setModels(models);
      })
      .catch((err) => {
        setData(mockData);
        setModels(mockData);
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
          <div className="flex flex-col basis-1/5 items-start px-10 py-9 border-r border-brand-text/25 h-full min-h-[80vh] flex-grow">
            <Disclosure>
              <Disclosure.Button className="py-2 flex flex-row items-center justify-between w-full">
                <p className="text-brand-text font-bold">Filters</p>
                <img
                  src="/assets/icons/caret.svg"
                  alt="Caret"
                  className="w-4"
                />
              </Disclosure.Button>
              <Disclosure.Panel className="text-brand-text">
                <ul className="flex flex-col gap-y-2">
                  <li className="cursor-pointer">Classification</li>
                  <li className="cursor-pointer">Regression</li>
                </ul>
              </Disclosure.Panel>
            </Disclosure>
            <hr className="border-brand-text/25 my-4 border w-full" />
            <Disclosure>
              <Disclosure.Button className="py-2 flex flex-row items-center justify-between w-full">
                <p className="text-brand-text font-bold">Price</p>
                <img
                  src="/assets/icons/caret.svg"
                  alt="Caret"
                  className="w-4"
                />
              </Disclosure.Button>
              <Disclosure.Panel className="text-brand-text">
                👉👈 Come on... you&apos;re in Web3!
              </Disclosure.Panel>
            </Disclosure>
          </div>
          <div className="flex flex-col basis-4/5 px-8 py-11">
            <div className="flex flex-row w-full items-end justify-end mb-11">
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
            <div className="grid grid-cols-4 w-full gap-x-6 gap-y-8">
              {filteredData.map((model, index) => {
                return (
                  <Link href={`/models/${model.id}`} key={model.id}>
                    <div className="flex flex-col rounded-lg overflow-hidden drop-shadow-sm cursor-pointer">
                      <img
                        src={`/assets/models/Model ${index % 4}.png`}
                        alt={model.name}
                      />
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
    </main>
  );
}
