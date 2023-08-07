import { cva } from "class-variance-authority";

const skeletonVariants = cva("w-full bg-slate-200 animate-pulse rounded-2xl", {
  variants: {
    variant: {
      default: "text-slate-600 hover:text-white hover:bg-accentPrimary/80",
      today: "md:col-span-8 min-h-[4rem] h-72 max-h-[20rem]",
      tomorrow: "md:col-span-4 min-h-[4rem] h-72 max-h-[20rem]",
      highlights: "h-full m-6",
    },
    size: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export {skeletonVariants}