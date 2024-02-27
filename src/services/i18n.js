import en from "./language/en.json";
import mm from "./language/mm.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export const initializeLocalization = async () => {
  i18next.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
      en: { translation: en },
      mm: { translation: mm },
    },
    lng: (await AsyncStorage.getItem("language")) || "mm",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};
