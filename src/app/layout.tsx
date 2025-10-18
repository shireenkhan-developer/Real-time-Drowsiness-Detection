import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Driver Drowsiness Detection System",
  description: "Real-time drowsiness detection using AI and computer vision",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

