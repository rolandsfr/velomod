import localizedEn from "./../locales/en/translations.json";
import localizedLv from "./../locales/lv/translations.json";
import { useRouter } from "next/router";

const useLocale = (): typeof localizedEn => {
  const { locale } = useRouter();
  return locale == "en" ? localizedEn : localizedLv;
};

export { useLocale };
