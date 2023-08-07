import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "active:scale-95 hover:scale-105 duration-200 inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-0 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-slate-600 hover:text-white hover:bg-accentPrimary/80",
        navFocus:
          "bg-accentPrimary text-white shadow-lg shadow-accentPrimary/50",
        destructive: "text-white hover:bg-red-600 dark:hover:bg-red-600",
        outline:
          "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100 border border-slate-200 dark:border-slate-700",
        subtle:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100",
        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
        link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-slate-900 dark:text-slate-100 hover:bg-transparent dark:hover:bg-transparent",
      },
      size: {
        default: "h-10 w-10 text-xl",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export {buttonVariants}