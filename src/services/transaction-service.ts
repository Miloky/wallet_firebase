import { store } from './firebase-service';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
} from 'firebase/firestore';


class TransactionService {
  // TODO: Add types
  // TODO: Add 
  public async create(accountId: string, val: any): Promise<string> {
    const collectionRef = collection(store, 'accounts', accountId, 'transactions');
    const docRef = await addDoc(collectionRef, val);
    return docRef.id;
  }

  // TODO: Types for return value
  public async getById(accountId: string, transactionId: string): Promise<any[]> {
    const docRef = doc(store, 'accounts', accountId, 'transactions', transactionId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as any[];
    } else {
      throw new Error('No such document!');
    }
  }

  // TODO: Add types
  public async getAll(accountId: string): Promise<any[]> {
    const collectionRef = collection(store, 'accounts', accountId, 'transactions');
    const docs = await getDocs(collectionRef);
    const result: any[] = [];
    docs.forEach(doc => result.push({ id: doc.id, ...doc.data()}));
    return result;
  }
}

const transactionService = new TransactionService();
export default transactionService;