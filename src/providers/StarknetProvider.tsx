import { InjectedConnector } from "starknetkit/injected";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { mainnet } from "@starknet-react/chains";
import { StarknetConfig, publicProvider } from "@starknet-react/core";

export default function StarknetProvider({ children }: any) {
  const chains = [mainnet];
  const connectors = [
    new InjectedConnector({ options: { id: "braavos" } }),
    new InjectedConnector({ options: { id: "argentX" } }),
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
  ];

  return (
    <StarknetConfig
      chains={chains}
      provider={publicProvider()}
      connectors={connectors as any}
    >
      {children}
    </StarknetConfig>
  );
}
