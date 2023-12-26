import Link from "next/link";

import { ArrowDownToLine, CheckCircle2, Clock } from "lucide-react";
import { FaDiscord } from "react-icons/fa";

import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProductReel } from "@/components/ProductReel";
import { ReviewSlider } from "@/components/ReviewSlider";
import { ProductsPageProps } from "./products/page";

const perks = [
  { name: 'Instant Access', icon: ArrowDownToLine, description: 'Access your assets instantly via email and download them within seconds.' },
  { name: 'Premium Quality', icon: CheckCircle2, description: 'Collaborating exclusively with top-tier creators to guarantee the finest quality items.' },
  { name: '24/7 Support', icon: Clock, description: 'Our team of experts remains available 24/7 to promptly address all your inquiries.' },
]

type Param = string | string[] | undefined

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined
}

export default function Home({ searchParams }: ProductsPageProps) {
  const sort = parse(searchParams.sort)
  const category = parse(searchParams.category)

  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your Premier Destination for top-tier{" "}
            <span className="text-blue-600">Game Cheats</span>. {/* text-transparent bg-gradient-to-t bg-clip-text */}
          </h1>

          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to RedEye. Every Service on our platform
            is hand-picked and vetted by our team of experts.
            We only work with the best of the best.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href='https://discord.gg/YcVnq3e8WP' className={buttonVariants()}>
              <div className="flex justify-center items-center">
                <FaDiscord className="w-4 mr-2" />
                Discord
              </div>
            </Link>
            <Link href='/products' target="_blank" className={buttonVariants({ variant: 'outline' })}>Our quality promise &rarr;</Link>
          </div>
        </div>

        <ProductReel query={{ sort: 'desc', limit: 4 }} title="Brand new" href="/products" />
      </MaxWidthWrapper>

      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div key={perk.name} className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">{perk.name}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>

      </section>
      {category?.length! > 0 ? category?.length : 0}
    </>
  )
}
