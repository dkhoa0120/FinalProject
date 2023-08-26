import React, { useEffect, useState } from "react";
import * as helperApi from "../service/api.helper";

const LanguageContext = React.createContext(null);

function LanguageProvider({ children }) {
  const [languages, setLanguages] = useState([]);
  const languageOptions = languages.map((lang) => ({
    value: lang,
    label: lang,
  }));

  useEffect(() => {
    const fetchLanguageOptions = async () => {
      try {
        const response = await helperApi.getLanguage();
        setLanguages(response.data);
      } catch (error) {
        console.error("Error fetching language options:", error);
      }
    };

    fetchLanguageOptions();
  }, []);

  return (
    <LanguageContext.Provider value={{ languages, languageOptions }}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageContext, LanguageProvider };
