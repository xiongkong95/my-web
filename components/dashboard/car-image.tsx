"use client";

import { useState } from "react";
import Image from "next/image";
import { Car } from "lucide-react";
import { cn } from "@/lib/utils";

type CarImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function CarImage({ src, alt, className }: CarImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative shrink-0 overflow-hidden rounded-lg bg-muted", className)}>
      {failed ? (
        <div className="flex size-full items-center justify-center text-muted-foreground">
          <Car className="size-1/2" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="160px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
