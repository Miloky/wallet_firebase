import { collection, getDocs, addDoc} from "firebase/firestore";
import { store } from "./firebase-service";
import categories from './categories.json';

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

  public async init(): Promise<void>{
    const categoriesRef = collection(store, 'categories');

    categories.map(async (x)=> {
      const categoryRef = await addDoc(categoriesRef, { name: x.name });
      const subCollectionRef = collection(categoryRef, 'sub');

      await Promise.all([...x.subcategories.map(async c => await addDoc(subCollectionRef, {name: c }))]);
    });
  }
}

const categoryRepository = new CategoryRepository();
// categoryRepository.init();
export default categoryRepository;
