"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            className="mb-2 mt-[100vh] w-full border-[0.1px] bg-dark-blue py-8"
            key={id}
            {...props}
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle className="text-[12px]">{title}</ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-[12px]">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
