import {
  collection,
  addDoc,
  doc,
  getDocs,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';

import { store } from './firebase-service';


// TODO: move to constants
enum Collection {
  Accounts = 'accounts',
}

// TODO: Rename property logo to logoUrl
export interface Account {
  id: string;
  name: string;
  balance: number;
  logo: string;
  currencyCode: string;
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
        logo: data.logo,
        currencyCode: data.currencyCode
      });
    });
    return result;
  }

  public async create(val: Omit<Account, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(store, 'accounts'), val);
    return docRef.id;
  }

  public async getById(id: string): Promise<Account> {
    const docRef = doc(store, 'accounts', id);
    const snapshot = await getDoc(docRef);
    const data = snapshot.data()!;
    return {
      id,
      name: data.name,
      balance: data.balance,
      logo: data.logo,
      currencyCode: data.currencyCode
    }
  }

  public async delete(id: string): Promise<void> {
    const docRef = doc(store, Collection.Accounts, id);
    await deleteDoc(docRef);
  }
}

const accountService = new AccountService();
export default accountService;
