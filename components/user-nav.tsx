"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser } from "@/hooks/use-user"
import { cn } from "@/lib/utils"
import { useClerk } from "@clerk/nextjs"

import { useRouter } from "next/navigation"
import { Skeleton } from "./ui/skeleton"



interface UserNavProps {
  avtarBig?: boolean
}


export function UserNav({ avtarBig }: UserNavProps) {
  const { signOut } = useClerk()

  const router = useRouter()

  const { user, isLoading } = useUser()

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isLoading ? (
            <Skeleton className="w-8 h-8 rounded-full" />
          ) : (
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className={cn("h-8 w-8",
                avtarBig && "h-10 w-10"
              )}>
                <AvatarImage
                  src={user?.avatar || ""}
                  alt={user?.name?.slice(0, 2)?.toUpperCase() || "ES"}
                  className="object-contain"
                />
                <AvatarFallback>
                  {user?.name?.slice(0, 2)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push("/")}>
              Home
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/dashboard/mybookings")}>
              Dashboard
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onClick={() => router.push("/dashboard/myevents")}
            >
              Your Events
            </DropdownMenuItem>
            {(user?.role === "SUPERADMIN" || user?.role === "ADMIN") && (
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/events")}
              >
                Manage Events
              </DropdownMenuItem>
            )} */}

          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}
