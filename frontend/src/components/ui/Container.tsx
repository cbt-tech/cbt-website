import type { ComponentPropsWithoutRef } from "react";
import { joinClassNames } from "@/lib/utils";

export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={joinClassNames("mx-auto w-full max-w-6xl px-6", className)} {...props} />;
}
