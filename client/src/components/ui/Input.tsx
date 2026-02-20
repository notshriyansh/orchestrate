import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ style, ...props }: InputProps) {
  return (
    <input
      {...props}
      style={{
        padding: "8px 10px",
        borderRadius: 6,
        border: "1px solid #334155",
        background: "#111827",
        color: "white",
        outline: "none",
        fontSize: 14,
        width: "100%",
        ...style,
      }}
    />
  );
}
