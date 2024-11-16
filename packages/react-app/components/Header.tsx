import { Disclosure } from "@headlessui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useWeb3 } from "@/contexts/useWeb3";

export default function Header() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();
  const { address } = useWeb3();

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect({ connector: injected({ target: "metaMask" }) });
    }
  }, []);

  return (
    <Disclosure as="nav">
      <div className="relative w-full z-50">
        <div className="mx-auto max-w-7xl px-2">
          <div className="relative flex h-16 justify-between items-center">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Image
                  className="block h-8 w-auto sm:block lg:block"
                  src="/logo.svg"
                  width="24"
                  height="24"
                  alt="Celo Logo"
                />
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {!address && <div className="h1">Please connect your wallet</div>}
              {!hideConnectBtn && (
                <ConnectButton
                  showBalance={{
                    smallScreen: true,
                    largeScreen: false,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
