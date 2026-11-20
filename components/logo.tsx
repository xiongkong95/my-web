import Image from "next/image";

type LogoProps = {
  className?: string;
  priority?: boolean;
  variant?: "auto" | "dark";
};

const WIDTH = 1523;
const HEIGHT = 817;

export function Logo({ className = "", priority = false, variant = "auto" }: LogoProps) {
  const common = { width: WIDTH, height: HEIGHT, priority };
  const alt = "Moora Auto Service";

  if (variant === "dark") {
    return (
      <div className={className}>
        <Image src="/logo-dark.png" alt={alt} {...common} className="h-auto w-full" />
      </div>
    );
  }

  return (
    <div className={className}>
      <Image src="/logo.png" alt={alt} {...common} className="h-auto w-full dark:hidden" />
      <Image src="/logo-dark.png" alt="" {...common} className="hidden h-auto w-full dark:block" />
    </div>
  );
}
