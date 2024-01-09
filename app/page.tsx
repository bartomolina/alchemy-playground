"use client";

import { Login } from "./components/login";
import { usePrivy } from "@privy-io/react-auth";
import { useAAWallet } from "@/hooks/use-aa-wallet";
import { useEffect, useState } from "react";

export default function Home() {
  const { authenticated } = usePrivy();
  const { wallet, walletClient, alchemyProvider } = useAAWallet();
  const [smartAccountAddress, setSmartAccountAddress] = useState<string>();

  useEffect(() => {
    if (alchemyProvider) {
      alchemyProvider.getAddress().then(setSmartAccountAddress);
    } else {
      setSmartAccountAddress(undefined);
    }
  }, [alchemyProvider]);

  return (
    <div className="max-w-2xl m-auto py-10 px-5 flex flex-col gap-5">
      <div>
        <Login />
      </div>
      {authenticated && walletClient && (
        <div className="flex flex-col gap-2.5">
          <div>
            <span className="label-text">Connected wallet</span>
            <div>{wallet?.address}</div>
          </div>
          <div>
            <span className="label-text">Chain</span>
            <div>
              {walletClient.chain?.name} ({walletClient.chain?.id})
            </div>
          </div>
          <div className="p-5 bg-blue-50 flex flex-col gap-2.5">
            <div>
              <span className="label-text">Smart Account</span>
              <div>{smartAccountAddress}</div>
            </div>
            <div>
              <span className="label-text">Entry Point</span>
              <div>{alchemyProvider?.getEntryPointAddress()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
