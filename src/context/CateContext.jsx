import React, { useState } from "react";
import { getCategories } from "../service/api.category";
import { useEffect } from "react";

const CategoryContext = React.createContext(null);

function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [cateOptions, setCateOptions] = useState([]);

  useEffect(() => {
    const fetchCateOptions = async () => {
      try {
        let res = await getCategories({ excludeDeleted: true, pageSize: 50 });
        setCategories(res.data.itemList);
        setCateOptions(mapToOption(res.data.itemList));
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setCategories([]);
          setCateOptions([]);
        }
      }
    };

    fetchCateOptions();
  }, []);

  const mapToOption = (items) => {
    return items?.map((i) => ({
      value: i.id,
      label: i.name,
    }));
  };

  return (
    <CategoryContext.Provider value={{ categories, cateOptions }}>
      {children}
    </CategoryContext.Provider>
  );
}

export { CategoryContext, CategoryProvider };
