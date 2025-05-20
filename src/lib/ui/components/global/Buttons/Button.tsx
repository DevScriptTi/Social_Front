"use client";
import "@/app/globals.css";
import React, { experimental_useEffectEvent } from "react";

export default function Button({ children, click, disabled = false, mode, icon, type }: { children?: React.ReactNode, click?: () => void, disabled?: boolean, type?: "submit" | "reset" | "button" | undefined, mode?: "filled" | "outlined" | "text" | "icon" | "elevated", icon?: React.ReactNode }) {
  const baseClass = "h-10 w-fit px-4 flex items-center justify-center rounded-full text-label-large";
  const variants = {
    filled: `bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary hover:bg-primary/65 dark:hover:bg-dark-primary/65 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-offset-dark-background`,
    outlined: `border-2 border-primary dark:border-dark-primary text-primary dark:text-dark-primary hover:bg-primary/10 dark:hover:bg-dark-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-offset-dark-background`,
    text: `text-primary dark:text-dark-primary  hover:bg-primary/10 dark:hover:bg-dark-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-offset-dark-background`,
    icon: `bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary hover:bg-primary/65 dark:hover:bg-dark-primary/65 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-offset-dark-background`,
    elevated: `shadow-md bg-primary-container dark:bg-dark-primary-container text-on-primary-container dark:text-dark-on-primary-container shadow-md hover:shadow-lg hover:bg-primary/65 dark:hover:bg-dark-primary/65 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 focus:ring-offset-2 focus:ring-offset-background dark:focus:ring-offset-dark-background`,
  }
  return (
    <button
      type={type}
      onClick={click}
      disabled={disabled}
      className={`
            ${baseClass}
            ${icon ? "gap-2 ps-2 pe-4" : ""}
            ${mode == "icon" ? "size-10! ps-0! pe-0! p-0! " : ""}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""} 
            ${mode === "filled" ? variants.filled : ""} 
            ${mode === "outlined" ? variants.outlined : ""} 
            ${mode === "text" ? variants.text : ""} 
            ${mode === "icon" ? variants.icon : ""} 
            ${mode === "elevated" ? variants.elevated : ""} 
            
        `}
    >
      {
        mode === "icon" ? <span className="block size-6">{icon}</span> : <>
          {
            icon ? <>
              <span className="block size-6">{icon}</span>
              <span className="block">{children}</span>
            </>
              : <span className="block">{children}</span>
          }
        </>
      }

    </button>
  );
}
