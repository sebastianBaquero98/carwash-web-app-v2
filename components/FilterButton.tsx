"use client";
import React, { useTransition } from "react";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const FilterButton = () => {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    const dateParam = searchParams.get("date");
    if (dateParam) {
      params.delete("date");
    }
    params.set("isFilter", "1");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };
  return (
    <div className="relative inline-block">
      <Image
        src="/icons/filter-icon.svg"
        width={25}
        height={25}
        alt="credit-card-icon"
        onClick={handleFilter}
        className={`${isPending ? "opacity-25" : ""}`}
      />
      {isPending && (
        <span className="absolute -right-1 -top-1 flex size-3">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-mclaren-orange opacity-75"></span>
          <span className="relative inline-flex size-3 rounded-full bg-mclaren-orange"></span>
        </span>
      )}
    </div>
  );
};

export default FilterButton;
