/* eslint-disable @next/next/no-img-element */
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { useConnectors } from "@starknet-react/core";

interface IModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Modal({ isOpen, setIsOpen }: IModal) {
  const { connect, connectors } = useConnectors();

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto rounded-lg bg-white flex flex-col px-12 py-8">
          <Dialog.Title className="text-brand-text font-bold text-2xl text-center mb-4">
            You need a Starknet wallet
          </Dialog.Title>
          {connectors.map((connector) => (
            <li key={connector.id}>
              <button
                className="py-3 px-11 bg-brand-primary rounded-lg font-bold text-xl text-white capitalize w-full"
                onClick={() => {
                  connect(connector);
                  setIsOpen(false);
                }}
              >
                {connector.id}
              </button>
            </li>
          ))}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
