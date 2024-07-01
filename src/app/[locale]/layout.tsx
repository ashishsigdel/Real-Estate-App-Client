import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import "@/styles/globals.scss";
import { ToastUtils } from "@/utils";
import { Header } from "@/components/header";
import { CustomThemeProvider, StoreProvider } from "@/providers";
import AuthUtil from "@/components/utils/AuthUtils";
import { SocketContextProvider } from "@/context/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Real-Estate",
  description:
    "A full-stack web application that provides a comprehensive platform for buying, selling, and renting properties.",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = useMessages();
  unstable_setRequestLocale(locale);
  return (
    <StoreProvider>
      <html suppressHydrationWarning={true} lang={locale}>
        <body className="dark:bg-dark">
          <NextIntlClientProvider messages={messages}>
            <CustomThemeProvider>
              <AuthUtil />
              <SocketContextProvider>
                <Header />
                {children}
              </SocketContextProvider>
            </CustomThemeProvider>
            <ToastUtils />
          </NextIntlClientProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
