"use client"

import { User } from "@/payload-types"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"

export const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant='ghost' size='sm' className="relative">My Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-60" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-md text-sm text-black">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {user.role === "admin" && (
          <>
            <DropdownMenuItem>
              <Link href='/dash'>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/admin'>Admin Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}