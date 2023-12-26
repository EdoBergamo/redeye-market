"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthCredentialsValidator, TAuthCredentialsValidator } from "@/lib/validators/accounts-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from 'sonner'
import { ZodError } from "zod";
import { useRouter } from "next/navigation";

const Page = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator)
  });

  const router = useRouter();

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success('Logged in successfully');
      router.refresh();
      router.push('/');
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error('Invalid credentials');
      }
    }
  })

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password })
  }

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">
              Login to your Account
            </h1>

            <Link className={buttonVariants({ variant: 'link', className: 'text-blue-500 gap-1.5' })} href='/register'>
              Don&apos;t have an account? Sign-up
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input {...register("email")} autoComplete="off" className={cn({ "focus-visible:ring-red-500": errors.email })} placeholder="example@redeye.com" /> {/* TODO: Change name */}
                  {errors?.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input {...register("password")} autoComplete="off" type="password" className={cn({ "focus-visible:ring-red-500": errors.password })} placeholder="••••••••" />
                  {errors?.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <Button>Login</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page