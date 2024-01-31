import {
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';

import { store } from './firebase-service';

enum Collection {
  Accounts = 'accounts',
}

export interface Account {
  id: string;
  name: string;
  balance: number;
}

class AccountService {
  public async getAll(): Promise<Account[]> {
    const snapshot = await getDocs(collection(store, Collection.Accounts));
    const result: Array<Account> = [];
    snapshot.forEach((item) => {
      const data = item.data();
      result.push({
        id: item.id,
        name: data.name,
        balance: data.balance,
      });
    });
    return result;
  }

  public async create(val: Omit<Account, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(store, 'accounts'), val);
    return docRef.id;
  }

  public async delete(id: string): Promise<void> {
    const docRef = doc(store, Collection.Accounts, id);
    await deleteDoc(docRef);
  }
}

const accountService = new AccountService();
export default accountService;
