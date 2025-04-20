import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "white" | "muted";
  className?: string;
  fullPage?: boolean;
}

export default function LoadingSpinner({
  size = "md",
  color = "primary",
  className = "",
  fullPage = false,
}: LoadingSpinnerProps) {
  // Size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "h-4 w-4 border-2";
      case "md":
        return "h-8 w-8 border-[3px]";
      case "lg":
        return "h-12 w-12 border-[4px]";
      case "xl":
        return "h-16 w-16 border-[5px]";
      default:
        return "h-8 w-8 border-[3px]";
    }
  };

  // Color classes
  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return "border-teal-600 border-t-transparent";
      case "white":
        return "border-white border-t-transparent";
      case "muted":
        return "border-gray-400 border-t-transparent";
      default:
        return "border-teal-600 border-t-transparent";
    }
  };

  // Full page loader
  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center">
        <div
          className={`rounded-full animate-spin ${getSizeClasses()} ${getColorClasses()} ${className}`}
        />
      </div>
    );
  }

  // Regular spinner
  return (
    <div
      className={`rounded-full animate-spin ${getSizeClasses()} ${getColorClasses()} ${className}`}
    />
  );
}
