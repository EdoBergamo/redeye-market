"use client";

import { PRODUCT_CATEGORY } from "@/config";
import { useEffect, useRef, useState } from "react";
import { NavItem } from "./NavItem";
import { useOnClickOutisde } from "@/hooks/use-on-click-outside";

export const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    }

  }, []);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutisde(navRef, () => setActiveIndex(null));

  return (
    <div ref={navRef} className="flex gap-4 h-full">
      <NavItem text="Home" href="/" />
      <NavItem text="Products" href="/products" />
      <NavItem text="Reviews" href="/reviews" />
      {/* <NavItem text="Status" href="/reviews" /> */}
      <NavItem text="Discord" target="_blank" href="https://discord.gg/YcVnq3e8WP" />
    </div>
  )
}