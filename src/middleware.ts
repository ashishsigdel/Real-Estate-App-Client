import createMiddleware from "next-intl/middleware";

import { locales, localePrefix } from "./navigation";

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  localePrefix: "never",

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
