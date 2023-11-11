"use client";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { StarknetConfig, InjectedConnector } from "@starknet-react/core";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("preline");
  }, []);

  const connectors = [
    new InjectedConnector({ options: { id: "braavos" } }),
    new InjectedConnector({ options: { id: "argentX" } }),
  ];

  return (
    <StarknetConfig connectors={connectors}>
      <Component {...pageProps} />
      <Toaster position="top-center" reverseOrder={false} />
    </StarknetConfig>
  );
}
