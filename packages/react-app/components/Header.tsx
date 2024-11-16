/* eslint-disable react/no-unescaped-entities */
import { Disclosure } from "@headlessui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function Header() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect();

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
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
