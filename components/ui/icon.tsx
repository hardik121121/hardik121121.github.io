import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";
import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ReactElement,
} from "react";

type IconProps = Omit<LucideProps, "children" | "ref"> & {
  children: ReactElement<LucideProps>;
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ children, className, strokeWidth, ...props }, ref) => {
    if (!isValidElement(children)) {
      return;
    }

    return cloneElement(children, {
      ...props,
      ref,
      className: cn("size-5 shrink-0", children.props.className, className),
      strokeWidth: strokeWidth ?? children.props.strokeWidth ?? 1.5,
    });
  },
);

Icon.displayName = "Icon";
