// =====================================================================
// Label (ປ້າຍຊື່ຂອງຊ່ອງພິມ) — ໄຟລ໌ນີ້ສ້າງໂດຍ shadcn (ບໍ່ຈຳເປັນຕ້ອງແກ້)
// ວິທີໃຊ້: <Label htmlFor="email">Email</Label>  (htmlFor ຕ້ອງກົງກັບ id ຂອງ Input)
// =====================================================================

"use client"

import * as React from "react"
import { cn } from "cn"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
