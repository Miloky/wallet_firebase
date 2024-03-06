import {
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  runTransaction,
  Timestamp,
  orderBy,
  query,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { store } from "./firebase-service";
import { Account } from "./account-service";
import { Transaction, TransactionType } from "../domain/transaction";

class TransactionService {
  // TODO: Add types
  // TODO: Add
  public async create(accountId: string, transaction: any): Promise<string> {
    let id: string = "";
    await runTransaction(store, async (storeTransaction) => {
      const { type, amount } = transaction;

      const accountRef = doc(store, "accounts", accountId);
      const transactionsRef = collection(accountRef, "transactions");
      const docRef = await addDoc(transactionsRef, {
        ...transaction,
        category: doc(store, "category", transaction.category),
        createdOn: Timestamp.now(),
        transactionDate: Timestamp.fromDate(transaction.transactionDate),
      });

      const accountSnapshot = await storeTransaction.get(accountRef);
      const account = accountSnapshot.data() as Account;

      const calculateBalance = (): number => {
        const currentBalance = account.balance;
        // for income +, for expanse/transfer -
        const changeAmount =
          type === "income" ? parseFloat(amount) : parseFloat(amount) * -1;
        return currentBalance + changeAmount;
      };

      const balance = calculateBalance();

      await storeTransaction.update(accountRef, { balance });
      id = docRef.id;
    });

    return id;
  }

  // TODO: Types for return value
  public async getById(
    accountId: string,
    transactionId: string
  ): Promise<any[]> {
    const docRef = doc(
      store,
      "accounts",
      accountId,
      "transactions",
      transactionId
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as any[];
    } else {
      throw new Error("No such document!");
    }
  }

  // TODO: Add types
  public async getAll(
    accountId: string
  ): Promise<
    {
      id: string;
      category: any;
      createdOn: Timestamp;
      description: string;
      amount: number;
      transactionDate: Timestamp;
      type: string;
    }[]
  > {
    const accountTransactionsRef = collection(
      store,
      "accounts",
      accountId,
      "transactions"
    );
    const transactionQuery = query(
      accountTransactionsRef,
      orderBy("transactionDate", "desc")
    );
    const docs = await getDocs(transactionQuery);
    const result: any[] = [];
    docs.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));
    return result;
  }

  public async deleteById(
    accountId: string,
    transactionId: string
  ): Promise<void> {
    const transactionsRef = doc(
      store,
      "accounts",
      accountId,
      "transactions",
      transactionId
    );
    const transaction = (await getDoc(transactionsRef)).data() as Transaction;
    const accountRef = doc(store, "accounts", accountId);
    const account = (await getDoc(accountRef)).data() as Account;
    const balance =
      account.balance +
      (transaction.type === "Income" ? -1 : 1) +
      transaction.amount;
    await deleteDoc(transactionsRef);
    await updateDoc(accountRef, { balance });
  }
}

const transactionService = new TransactionService();
export default transactionService;
