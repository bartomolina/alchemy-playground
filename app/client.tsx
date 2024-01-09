"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import {
  PrivyWagmiConnector,
  useSwitchNetwork,
} from "@privy-io/wagmi-connector";
import { sepolia } from "@wagmi/chains";
import { configureChains } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { env } from "@/env.mjs";

const configureChainsConfig = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: env.NEXT_PUBLIC_ALCHEMY_SEPOLIA })]
);

const queryClient = new QueryClient();

export function Client({ children }: { children: React.ReactNode }) {
  // const { chains } = useSwitchNetwork();

  // console.log(chains);

  return (
    <PrivyProvider appId={env.NEXT_PUBLIC_PRIVY_APP_ID}>
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </PrivyWagmiConnector>
    </PrivyProvider>
  );
}
