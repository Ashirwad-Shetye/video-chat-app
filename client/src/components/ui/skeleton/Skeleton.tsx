import cn from "../../../utils/clsx";
import { skeletonVariants } from "./skeleton-variants";

export interface SkeletonProps {
  variant: "default";
  isLoading: boolean;
  size: "default";
  children: string;
  className: string;
}

const Skeleton = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}: SkeletonProps) => {
  return (
    <>
      {isLoading ? (
        <div
          className={cn(skeletonVariants({ variant, size, className }))}
          {...props}
        >
          {children}
        </div>
      ) : null}
    </>
  );
};

export default Skeleton;
