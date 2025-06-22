import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";

export const ViewSeperator = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <div
        className={cn("flex items-center py-[20px] justify-center", className)}
      >
        <Separator
          orientation="vertical"
          className={"h-[50px] text-center w-[1px] bg-gray-500/50"}
        />
      </div>
      {children}
      {children && (
        <div
          className={cn(
            "flex items-center py-[20px] justify-center",
            className
          )}
        >
          <Separator
            orientation="vertical"
            className={"h-[50px] text-center w-[1px] bg-gray-500/50"}
          />
        </div>
      )}
    </>
  );
};
