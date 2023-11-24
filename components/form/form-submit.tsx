"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
};

export const FormSubmit = ({
  children,
  className,
  disabled,
  variant = "primary",
}: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      className={cn(className)}
      size="sm"
      variant={variant}
      type="submit"
      disabled={pending || disabled}
    >
      {children}
    </Button>
  );
};
