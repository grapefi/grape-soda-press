import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
// Components
import Connect from "./Connect";
import Buy from "./Buy";
import useMediaQuery from '@mui/material/useMediaQuery';

export default function MenuTop() {
  const [bgClass, setBgClass] = useState("");
  const pixelsToScrollBeforeStyleBg = 64;
  const matches = useMediaQuery('(min-width:500px)');

  useEffect(() => {
    window.addEventListener("scroll", function () {
      scrollY > pixelsToScrollBeforeStyleBg
        ? setBgClass("menu-background")
        : setBgClass("");
    });
  }, []);

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 py-2 pt-0">
      {({ open }) => (
        <>
          <div className={`app-container ${bgClass}`}>
            <div className="flex items-center justify-end h-16">
              <div className="flex items-center grow full-width-mobile">
                <figure className="flex flex-col items-start">
                  <Link passHref href={"https://grapefinance.app"}>
                    <a>
                      <Image
                        className="h-8 md:h-16 w-auto"
                        src={matches ? "/img/logo-horizontal.png" : "/img/grape.png"}
                        alt="Grape Finance Logo"
                        height={50}
                        width={matches ? 350 : 50}
                      />
                    </a>
                  </Link>
                </figure>
                <div className="ml-5 hide-on-mobile">
                  <a href="https://grapefinance.gitbook.io/grape-finance-docs/unique-features/wine-press"><button className="app-btn w-full">Docs</button></a>
                </div>
              </div>
              <div>
                <Buy />
              </div>
              <div className="ml-5">
                <Connect />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
