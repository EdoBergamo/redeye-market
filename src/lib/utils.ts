import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next";
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | string, options: { currency?: "EUR" | "USD" | "GBP" | "BDT", notation?: Intl.NumberFormatOptions["notation"] } = {} ) {
  const { currency = "EUR", notation = "compact" } = options;
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}

export function constructMetadata({
  title = 'RedEye - the marketplace for high-quality cheats',
  description = 'RedEye is a marketplace for high-quality gaming cheats.',
  icons = '/logo.png',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@amtriix',
    },
    icons,
    metadataBase: new URL('https://redeye.com'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}