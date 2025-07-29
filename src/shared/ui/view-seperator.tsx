import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";

export const ViewSeperator = ({
  className,
  children,
  isTransparent = false,
}: {
  className?: string;
  children?: React.ReactNode;
  isTransparent?: boolean;
}) => {
  return (
    <>
      <div
        className={cn("flex items-center py-[20px] justify-center", className)}
      >
        <Separator
          orientation="vertical"
          className={cn(
            "h-[50px] text-center w-[1px] bg-gray-500/50",
            isTransparent && "bg-transparent"
          )}
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
