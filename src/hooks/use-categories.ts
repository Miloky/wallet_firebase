import { useEffect, useState } from "react";
import categoryRepsitory, { CategoryGroup, Category } from "../services/category-repository";


type ReturnType = { loading: boolean; categories: CategoryGroup[], getCategoryById: (id: string) => Category | null };

const useCategories = (): ReturnType => {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryGroup[]>([]);

  const load = async (): Promise<void> => {
    const categoryList = await categoryRepsitory.getAll();
    setCategories(categoryList);
    setLoading(false);
  };

  const getCategoryById = (id: string): Category | null => {
    if(loading || categories.length === 0) return null;
    const category = categories.flatMap(g => ([g, ...g.sub])).find(c => c.id === id)!;
    return {
      id: category.id,
      name: category.name,
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { loading, categories, getCategoryById };
};

export default useCategories;
