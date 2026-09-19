import type { ComponentPropsWithoutRef } from "react";
import { joinClassNames } from "@/lib/utils";

export function Button({ className, type = "button", ...props }: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type={type}
      className={joinClassNames(
        "site-button",
        className,
      )}
      {...props}
    />
  );
}
