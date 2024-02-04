import { collection, getDocs } from "firebase/firestore";
import { store } from "./firebase-service";

export interface Category {
  id: string;
  name: string;
}

export interface CategoryGroup extends Category {
  sub: Category[];
}

class CategoryRepository {
  public async getAll(): Promise<CategoryGroup[]> {
    const categoriesRef = collection(store, "categories");
    const categoriesSnapshot = await getDocs(categoriesRef);
    const parentCategories: any[] = [];
    categoriesSnapshot.forEach((c) =>
      parentCategories.push({ ...c.data(), id: c.id })
    );

    const loadSub = async (id: string): Promise<Category[]> => {
      const documents: Category[] = [];
      const snapshot = await getDocs(
        collection(store, "categories", id, "sub")
      );

      snapshot.forEach((c) =>
        documents.push({
          ...c.data(),
          id: c.id,
        } as any)
      );
      return documents;
    };
    const result = await Promise.all(
      parentCategories.map(async (p) => ({
        ...p,
        sub: await loadSub(p.id),
      }))
    );
    return result;
  }
}

const categoryRepository = new CategoryRepository();
export default categoryRepository;
