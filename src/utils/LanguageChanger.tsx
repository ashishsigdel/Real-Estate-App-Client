"use client";

import { usePathname, useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function LanguageChanger() {
  const router = useRouter();
  const pathname = usePathname();

  const locale = useLocale();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const language = event.target.value;
    if (language === "en") {
      router.replace(pathname, { locale: "en" });
    }
    if (language === "np") {
      router.replace(pathname, { locale: "np" });
    }
  }

  return (
    <select
      onChange={handleChange}
      className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
      defaultValue={locale}
    >
      <option value="en">English</option>
      <option value="np">नेपाली</option>
    </select>
  );
}
