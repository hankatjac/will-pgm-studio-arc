import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  // const [buttonText, setButtonText] = useState(i18n.language);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      {i18n.language === "fr" ? (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => changeLanguage("en")}
        >
          EN
        </button>
      ) : (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => changeLanguage("fr")}
        >
          FR
        </button>
      )}
    </div>
  );
};

export default LanguageSwitcher;
