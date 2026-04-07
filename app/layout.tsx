import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GrowScaleX — WhatsApp Lead Qualification",
  description: "Real-time WhatsApp lead qualification dashboard",
  icons: {
    icon: "/Gemini_Generated_Image_hj9uarhj9uarhj9u%20-%20Edited.png",
    shortcut: "/Gemini_Generated_Image_hj9uarhj9uarhj9u%20-%20Edited.png",
    apple: "/Gemini_Generated_Image_hj9uarhj9uarhj9u%20-%20Edited.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
