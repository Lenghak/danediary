"use client";

import {
  Indicator as RadioGroupIndicator,
  Item as RadioGroupItemPrimitive,
  Root as RadioGroupRoot,
} from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import React from "react";

import { cn } from "@utils/cn";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupRoot>,
  React.ComponentPropsWithoutRef<typeof RadioGroupRoot>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupRoot
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupRoot.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupItemPrimitive>,
  React.ComponentPropsWithoutRef<typeof RadioGroupItemPrimitive>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupItemPrimitive
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    >
      <RadioGroupIndicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupIndicator>
    </RadioGroupItemPrimitive>
  );
});
RadioGroupItem.displayName = RadioGroupItemPrimitive.displayName;

export { RadioGroup, RadioGroupItem };
