"use client";

import {
  Close as DialogClosePrimitive,
  Content as DialogContentPrimitive,
  Description as DialogDescriptionPrimitive,
  Overlay as DialogOverlayPrimitive,
  Portal as DialogPortalPrimitive,
  Root as DialogRoot,
  Title as DialogTitlePrimitive,
  Trigger as DialogTriggerPrimitive,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";

import { cn } from "@utils/cn";

const Dialog = DialogRoot;

const DialogTrigger = DialogTriggerPrimitive;

const DialogPortal = DialogPortalPrimitive;

const DialogClose = DialogClosePrimitive;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogOverlayPrimitive>,
  React.ComponentPropsWithoutRef<typeof DialogOverlayPrimitive>
>(({ className, ...props }, ref) => (
  <DialogOverlayPrimitive
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80 data-[state=closed]:animate-out data-[state=open]:animate-in",
      className,
    )}
    ref={ref}
    {...props}
  />
));
DialogOverlay.displayName = DialogOverlayPrimitive.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContentPrimitive>,
  React.ComponentPropsWithoutRef<typeof DialogContentPrimitive>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogContentPrimitive
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in sm:rounded-lg",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <DialogClose className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </DialogContentPrimitive>
  </DialogPortal>
));
DialogContent.displayName = DialogContentPrimitive.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogTitlePrimitive>,
  React.ComponentPropsWithoutRef<typeof DialogTitlePrimitive>
>(({ className, ...props }, ref) => (
  <DialogTitlePrimitive
    className={cn(
      "font-semibold text-lg leading-none tracking-tight",
      className,
    )}
    ref={ref}
    {...props}
  />
));
DialogTitle.displayName = DialogTitlePrimitive.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogDescriptionPrimitive>,
  React.ComponentPropsWithoutRef<typeof DialogDescriptionPrimitive>
>(({ className, ...props }, ref) => (
  <DialogDescriptionPrimitive
    className={cn("text-muted-foreground text-sm", className)}
    ref={ref}
    {...props}
  />
));
DialogDescription.displayName = DialogDescriptionPrimitive.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
