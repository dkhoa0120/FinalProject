import React, { useState } from "react";
import { getCategories } from "../service/api.category";
import { useEffect } from "react";

const CategoryContext = React.createContext(null);

function CategoryProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const categoryOptions = categories?.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  useEffect(() => {
    const fetchCateOptions = async () => {
      try {
        let res = await getCategories({ pageSize: 50 });
        setCategories(res.data.itemList);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setCategories([]);
        }
      }
    };

    fetchCateOptions();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, categoryOptions }}>
      {children}
    </CategoryContext.Provider>
  );
}

export { CategoryContext, CategoryProvider };
