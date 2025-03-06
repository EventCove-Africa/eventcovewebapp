import Skeleton from "react-loading-skeleton";

interface SkeletonLoaderProps {
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 3,
  className = "w-full md:w-1/3 h-[392px] rounded-md",
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} count={1} className={className} />
      ))}
    </>
  );
};

export default SkeletonLoader;
