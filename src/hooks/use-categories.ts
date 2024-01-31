import { useEffect, useState } from "react";
import categoryRepsitory from "../services/category-repository";

type ReturnType = { loading: boolean; categories: any[] };

const useCategories = (): ReturnType => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<any[]>([]);

  const load = async (): Promise<void> => {
    const categoryList = await categoryRepsitory.getAll();
    setLoading(false);
    setCategories(categoryList);
    console.log("categoryList", categoryList);
  };

  useEffect(() => {
    load();
  }, []);

  return { loading, categories };
};

export default useCategories;
