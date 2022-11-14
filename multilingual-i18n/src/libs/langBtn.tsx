import { useTranslation } from "react-i18next";

export default function ToggleLanguage() {
  const { i18n } = useTranslation(["public"]);

  const lngs: any = {
    en: { nativeName: "English" },
    fa: { nativeName: "Farsi" },
  };

  return (
    <div>
      {Object.keys(lngs).map((lng) => (
        <button
          key={lng}
          style={{
            fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
          }}
          type="submit"
          onClick={() => i18n.changeLanguage(lng)}
        >
          {lngs[lng].nativeName}
        </button>
      ))}
    </div>
  );
}
