import React, { useEffect, useState } from "react";
import { getLanguage } from "../service/api.helper";

const LanguageContext = React.createContext(null);

function LanguageProvider({ children }) {
  const [languageOptions, setLanguageOptions] = useState([]);

  useEffect(() => {
    const fetchLanguageOptions = async () => {
      try {
        const response = await getLanguage();
        setLanguageOptions(response.data);
      } catch (error) {
        console.error("Error fetching language options:", error);
      }
    };

    fetchLanguageOptions();
  }, []);

  return (
    <LanguageContext.Provider value={{ languageOptions }}>
      {children}
    </LanguageContext.Provider>
  );
}

export { LanguageContext, LanguageProvider };
