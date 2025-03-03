import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}
export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <section
      className={cn(
        "h-full mx-auto w-full max-w-screen-2xl px-4 md:px-12 lg:px-14 2xl:px-20",
        className
      )}
    >
      {children}
    </section>
  );
};
