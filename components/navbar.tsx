import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import Image from "next/image";
import { UserNav } from "./user-nav";

export function Navbar() {
  return (
    <nav className="w-full border-b h-16 top-0 z-50 bg-background fixed inset-x-0 px-6">
      <div className="sm:container mx-auto w-[95vw] h-full flex items-center sm:justify-between md:gap-2">
        <div className="flex items-center sm:gap-5 gap-2.5">
          <div className="flex items-center gap-6">
            <div className="sm:flex hidden">
              <Logo />
            </div>
            <div className="md:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground"></div>
          </div>
        </div>

        <div className="flex items-center sm:justify-normal justify-between sm:gap-3 ml-1 sm:w-fit w-[90%]">
          <UserNav />
          <div className="flex items-center justify-between sm:gap-2 ml-3">
            <div className="flex ml-4 sm:ml-0">
              <ModeToggle />
            </div>
          </div>
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
