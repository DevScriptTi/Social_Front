import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Dev Script",
  description: "Generated Dev Script",
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
