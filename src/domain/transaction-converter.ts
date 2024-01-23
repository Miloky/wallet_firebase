import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';
import { Transaction } from './transaction';

export const transactionConverter = {
  toFirestore(transaction: Transaction) {
    const { id, ...rest } = transaction;
    return rest;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot<DocumentData, DocumentData>,
    options?: SnapshotOptions | undefined
  ) {
    const data = snapshot.data(options);
    return new Transaction(
      parseInt(snapshot.id),
      data.amount,
      data.description,
      data.type
    );
  },
};
