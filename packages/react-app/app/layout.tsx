import "@/styles/globals.css";
import "./globals.css";

import { AppProvider } from "@/providers/AppProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-colors-primary">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
