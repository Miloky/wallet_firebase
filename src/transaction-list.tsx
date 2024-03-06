/* eslint-disable indent */
import { useState, useEffect, useCallback } from "react";
import Typography from "@mui/material/Typography";
import {
  Chip,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useParams } from "react-router-dom";
import transactionService from "./services/transaction-service";
import CreateTransactionDialog from "./create-transaction-dialog";
import { groupBy } from "./helpers/group-by";
import { Timestamp } from "@firebase/firestore";
import useCategories from "./hooks/use-categories";
import BasicMenu from "./transaction-options";

interface TransactionListItemProps {
  id: string;
  amount: number;
  description: string;
  type: string;
  // TODO: type
  category: any;
}

const getGroupNameOfTransactionDate = (transaction: {
  transactionDate: Timestamp;
}): string => {
  const { transactionDate } = transaction;
  const date = new Date(transactionDate.seconds * 1000);
  date.setHours(0, 0, 0, 0);

  return date.toDateString();
};

const TransactionListItem = (props: TransactionListItemProps) => {
  const { id, amount, description, type, category } = props;
  const { id: accountId } = useParams<{ id: string }>();
  const { getCategoryById } = useCategories();

  const getColor = (type: string) => {
    switch (type) {
      case "income":
        return "green";
      case "expense":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <>
      <TableRow key={id}>
        <TableCell style={{ width: "25%" }}>
          <Typography variant="subtitle2" color={getColor(type)}>
            {amount.toFixed(2)} UAH
          </Typography>
        </TableCell>
        <TableCell>
          <Chip size="small" label={getCategoryById(category.id)?.name} />
        </TableCell>
        <TableCell style={{ width: "30%" }}>
          <Typography variant="body2">{description}</Typography>
        </TableCell>
        <TableCell style={{ width: "30%" }}>
          <BasicMenu transactionId={id} accountId={accountId!}  />
        </TableCell>
      </TableRow>
    </>
  );
};

const TransactionList = () => {
  const { id } = useParams<{ id: string }>();
  const [groupedTransactions, setGroupedTransactions] = useState<any[]>([]);

  const getAllTransactions = useCallback(async () => {
    const transactions = await transactionService.getAll(id!);
    const grouped = groupBy(transactions, getGroupNameOfTransactionDate);
    setGroupedTransactions(grouped);
  }, [id]);

  const createTransaction = async (data: any): Promise<void> => {
    // TODO: fix
    data.amount = parseFloat(data.amount);
    await transactionService.create(id!, { ...data });
    await getAllTransactions();
  };

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  return (
    <Container style={{ marginTop: "30px" }}>
      <CreateTransactionDialog onSave={createTransaction} />

      {groupedTransactions.map((group) => (
        <TableContainer
          key={group.name}
          component={Paper}
          elevation={8}
          sx={{ marginBottom: "30px", marginTop: "15px" }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" colSpan={10}>
                  <Typography variant="subtitle2">{group.name}</Typography>
                </TableCell>
              </TableRow>
              {group.items.map((transaction: any) => (
                <TransactionListItem key={transaction.id} {...transaction} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </Container>
  );
};

export default TransactionList;
