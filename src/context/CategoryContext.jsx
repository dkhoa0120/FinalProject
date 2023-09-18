import React, { useState } from "react";
import * as categoryApi from "../service/api.category";
import { useEffect } from "react";

const CategoryContext = React.createContext(null);

function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const categoryOptions = categories?.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const fetchCateOptions = async () => {
    try {
      let res = await categoryApi.getCategories({ pageSize: 50 });
      setCategories(res.data.itemList);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setCategories([]);
      }
    }
  };

  useEffect(() => {
    fetchCateOptions();
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, categoryOptions, setCategories, fetchCateOptions }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export { CategoryContext, CategoryProvider };
