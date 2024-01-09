import { ConnectedWallet, usePrivy, useWallets } from "@privy-io/react-auth";
import { useState, useEffect, useCallback } from "react";
import { WalletClient, createWalletClient, custom } from "viem";
import { env } from "@/env.mjs";

import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { AlchemyProvider, SupportedChains } from "@alchemy/aa-alchemy";
import {
  getDefaultLightAccountFactoryAddress,
  LightSmartContractAccount,
} from "@alchemy/aa-accounts";

import * as chains from "viem/chains";

function getChain(chainId: number) {
  for (const chain of Object.values(chains)) {
    if (chain.id === chainId) {
      return chain;
    }
  }
}

export function useAAWallet() {
  const [wallet, setWallet] = useState<ConnectedWallet>();
  const [walletClient, setWalletClient] = useState<WalletClient>();
  const [alchemyProvider, setAlchemyProvider] = useState<AlchemyProvider>();
  const { wallets } = useWallets();
  const { user } = usePrivy();

  console.log("wallets:", wallets);
  console.log("user:", user);

  // Provide Alchemy's Smart Account
  useEffect(() => {
    setAlchemyProvider(undefined);

    if (
      walletClient &&
      walletClient.chain &&
      SupportedChains.has(walletClient.chain.id)
    ) {
      console.log(SupportedChains.has(walletClient.chain.id));

      const privySigner: SmartAccountSigner = new WalletClientSigner(
        walletClient,
        "json-rpc"
      );

      const provider = new AlchemyProvider({
        apiKey: env.NEXT_PUBLIC_ALCHEMY_SEPOLIA,
        chain: walletClient.chain,
      }).connect(
        (rpcClient) =>
          new LightSmartContractAccount({
            rpcClient,
            owner: privySigner,
            chain: rpcClient.chain,
            factoryAddress: getDefaultLightAccountFactoryAddress(
              rpcClient.chain
            ),
          })
      );

      setAlchemyProvider(provider);
    }
  }, [walletClient]);

  // Fetch Privy's active wallet
  useEffect(() => {
    const getWalletClient = async (wallet: ConnectedWallet) => {
      const eip1193provider = await wallet?.getEthereumProvider();
      const walletClient = createWalletClient({
        account: wallet.address as `0x{string}`,
        chain: getChain(Number(wallet.chainId.split(":")[1])),
        transport: custom(eip1193provider),
      });
      setWallet(wallet);
      setWalletClient(walletClient);
    };

    const embeddedWallet = wallets.length && wallets[0];

    if (embeddedWallet) {
      getWalletClient(embeddedWallet);
    }
  }, [wallets]);

  return { wallet, walletClient, alchemyProvider };
}
