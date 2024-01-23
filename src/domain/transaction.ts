export type TransactionType = 'Income' | 'Expence' | 'Transfer';
export class Transaction {
  constructor(
    id: number,
    amount: number,
    description: string,
    type: TransactionType
  ) {
    this.id = id;
    this.amount = amount;
    this.description = description;
    this.type = type;
  }
  public id: number;
  public amount: number;
  public description: string;
  public type: TransactionType;
}
