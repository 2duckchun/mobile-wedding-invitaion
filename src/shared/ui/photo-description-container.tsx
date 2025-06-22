import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const PhotoDescriptionContainer = ({
  className,
  title,
  image,
  description,
}: {
  className?: string;
  title: string;
  image: string | ReactNode;
  description: string | ReactNode;
}) => {
  return (
    <article className={cn(className)}>
      <header className="sr-only">
        <h2>{title ?? "title"}</h2>
      </header>
      {image && <div>{image}</div>}
      {description && <div>{description}</div>}
    </article>
  );
};
