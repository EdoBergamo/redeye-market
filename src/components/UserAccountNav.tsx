"use client"

import { useAuth } from "@/hooks/use-auth"
import { User } from "@/payload-types"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"

export const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visibl">
        <Button variant='ghost' size='sm' className="relative">My Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-md text-sm text-black dark:text-white">{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {user.role === "admin" && (
          <>
            <DropdownMenuItem>
              <a href='/dash'>Dashboard</a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <a href='/admin'>Admin Dashboard</a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem>
          <a href='/account'>Account</a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}