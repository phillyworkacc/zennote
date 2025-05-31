import "@/styles/global.css"
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "sonner";
import { InterFont } from "./fonts";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";

export const metadata: Metadata = {
  title: "Zennote",
  description: "Make a nice todo list for the day",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <SessionWrapper>
        <html lang="en">
          <head>
            <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"></link>
          </head>
          <body className={InterFont.className}>
            <Toaster theme="dark" position="top-center" />
            {children}
          </body>
        </html>
      </SessionWrapper>
    </ViewTransitions>
  );
}
