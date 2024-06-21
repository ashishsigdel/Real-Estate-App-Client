import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import "@/styles/globals.scss";
import { ToastUtils } from "@/utils";
import CustomThemeProvider from "@/providers/CustomThemeProviders";
import { Header } from "@/components/header";

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
    <html lang={locale}>
      <body className="dark:bg-dark">
        <NextIntlClientProvider messages={messages}>
          <CustomThemeProvider>
            <Header />
            {children}
          </CustomThemeProvider>
          <ToastUtils />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
