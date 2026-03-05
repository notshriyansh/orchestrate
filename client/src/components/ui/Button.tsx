import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  style,
  ...props
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    borderRadius: 8,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: "1px solid transparent",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      background: "#2563eb",
      color: "white",
    },
    outline: {
      background: "transparent",
      border: "1px solid #334155",
      color: "white",
    },
    ghost: {
      background: "transparent",
      color: "#94a3b8",
    },
  };

  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: "6px 12px", fontSize: 12 },
    md: { padding: "8px 16px", fontSize: 14 },
    lg: { padding: "10px 20px", fontSize: 16 },
  };

  return (
    <button
      {...props}
      style={{
        ...baseStyle,
        ...variants[variant],
        ...sizes[size],
        ...style,
      }}
    />
  );
}
