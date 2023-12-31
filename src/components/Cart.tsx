"use client";

import { ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";
import { CartItem } from "./CartItem";
import { useEffect, useState } from "react";

export const Cart = () => {
  const { items } = useCart();
  const itemCount = items.length;

  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cartTotal = items.reduce((total, { product }) => total + product.price, 0)

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart aria-hidden='true' className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-gray-200">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ScrollArea>
                {items.map(({ product }) => (
                  <CartItem key={product.id} product={product} />
                ))}
              </ScrollArea>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <a href='/cart' className={buttonVariants({ className: 'w-full' })}>Checkout</a>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div aria-hidden='true' className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image src='/logo.png' fill alt="Empty Cart" />
            </div>

            <div className="text-xl font-semibold">Your cart is Empty</div>
            <SheetTrigger asChild>
              <a href='/products' className={buttonVariants({ variant: 'link', size: 'sm', className: 'text-sm text-muted-foreground text-red-500' })}>Browse Products</a>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}