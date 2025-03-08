import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { UserNav } from "./user-nav";

export function Navbar() {
  return (
    <nav className="w-full border-b z-50 bg-background h-16 top-0 left-0 right-0 fixed">
      <div className="w-full h-full max-w-screen-2xl mx-auto px-5 md:px-14 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <UserNav />
          <ModeToggle />
        </div>  
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Image
        src={"/logo-dark.svg"}
        alt="logo"
        width={40}
        height={40}
        className="w-32 h-auto text-muted-foreground dark:hidden"
      />
      <Image
        src={"/logo-light.svg"}
        alt="logo"
        width={40}
        height={40}
        className="w-32 h-auto text-muted-foreground hidden dark:block"
      />
    </Link>
  );
}
