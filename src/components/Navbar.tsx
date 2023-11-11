/* eslint-disable @next/next/no-img-element */
import { ibm } from "@/styles/fonts";
import { useAccount, useConnectors } from "@starknet-react/core";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { account, address, status } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (status === "connected") setIsOpen(false);
  }, [account, address, status]);

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-brand-offwhite text-sm py-4 border-b">
      <nav
        className="w-full mx-auto px-24 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex w-full items-center justify-between">
          <Link className="flex-none text-xl font-semibold" href="/">
            ML Village
          </Link>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
              data-hs-collapse="#navbar-alignment"
              aria-controls="navbar-alignment"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
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
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <svg
                className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
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
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-alignment"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:flex flex-row items-end justify-end flex-end w-full"
        >
          <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
            <a
              className={clsx(
                "font-medium ",
                router.pathname === "/explore"
                  ? "text-brand-primary"
                  : "text-gray-600"
              )}
              href="/explore"
            >
              Explore
            </a>
            <a
              className={clsx(
                "font-medium ",
                router.pathname === "/sell"
                  ? "text-brand-primary"
                  : "text-gray-600"
              )}
              href="/sell"
            >
              Upload/Sell
            </a>
            {status === "disconnected" ? (
              <button
                type="button"
                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-brand-primary text-white hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#hs-vertically-centered-modal"
                onClick={() => setIsOpen(true)}
              >
                Connect Wallet
              </button>
            ) : (
              <a
                className="font-medium text-gray-600 hover:text-gray-400"
                href="/profile"
              >
                <img
                  className="inline-block h-[2.875rem] w-[2.875rem] rounded-full"
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                  alt="Image Description"
                />
              </a>
            )}
          </div>
        </div>
      </nav>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
