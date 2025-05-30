import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Social Housing Support",
  description: "Social Housing Support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
