"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

interface NavItemProps {
  href: string;
  text: string;
  target?: string;
}

export const NavItem = ({ text, href, target }: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <a href={href} target={target} className={cn('gap-1.5', buttonVariants({ variant: 'ghost' }))}>
          {text}
        </a>
      </div>
    </div>
  )
}