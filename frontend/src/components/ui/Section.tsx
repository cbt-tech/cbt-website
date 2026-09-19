import type { ComponentPropsWithoutRef } from "react";
import { joinClassNames } from "@/lib/utils";

export function Section({ className, ...props }: ComponentPropsWithoutRef<"section">) {
  return <section className={joinClassNames("py-12", className)} {...props} />;
}
