"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface UserNavProps {
  avtarBig?: boolean;
}

export function UserNav({ avtarBig }: UserNavProps) {
  const { signOut } = useClerk();
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (user && isSigningOut) {
      setIsSigningOut(false);
    }
  }, [user, isSigningOut]);

  const handleSignOut = useCallback(async () => {
    setIsSigningOut(true);
    
    try {
      await signOut(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.error("Error signing out:", error);
      setIsSigningOut(false);
    }
  }, [signOut]);


  if (isLoading) {
    return <Skeleton className="w-8 h-8 rounded-full bg-gray-400/40" />;
  }


  const showUser = user && !isSigningOut;

  return (
    <DropdownMenu>
      {showUser ? (
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className={cn("h-8 w-8", avtarBig && "h-10 w-10")}>
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
        </DropdownMenuTrigger>
      ) : (
        <Link href={"/sign-up"}>
          <Button size={"sm"} className="active:scale-95">
            Sign Up
          </Button>
        </Link>
      )}

      {showUser && (
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
            <DropdownMenuItem
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            {isSigningOut ? "Signing out..." : "Log out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}