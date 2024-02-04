import { useState, useEffect, useCallback } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, Divider, ListItemIcon, ListSubheader } from '@mui/material';
import { useParams } from 'react-router-dom';
import transactionService from './services/transaction-service';
import CreateTransactionDialog from './create-transaction-dialog';
import { groupBy } from './helpers/group-by';
import { Timestamp } from '@firebase/firestore';

interface TransactionListItemProps {
  id: string;
  amount: number;
  description: string;
  type: string;
}

const getGroupNameOfTransactionDate = (transaction: { transactionDate: Timestamp }): string => {
  const { transactionDate } = transaction;
  const date = new Date(transactionDate.seconds * 1000);
  date.setHours(0, 0, 0, 0);

  return date.toDateString()
};

const TransactionListItem = (props: TransactionListItemProps) => {
  const { id, amount, description, type } = props;

  const getColor = (type: string) => {
    switch (type) {
      case 'income':
        return 'green';
      case 'expense':
        return 'red';
      default:
        return 'black';
    }
  }

  return (<ListItem
    key={id}
    disablePadding
    onClick={() => console.log('TESTtjfdsjfl')}
  >
    <ListItemButton dense>
      <ListItemText disableTypography id={id} primary={<Typography variant="subtitle2" color={getColor(type)}>{amount} UAH</Typography>} secondary={<Typography variant="body2">{description}</Typography>} />
      <ListItemIcon >
        <IconButton edge="end" aria-label="edit" onClick={(e) => { e.nativeEvent.preventDefault(); console.log('Edit'); }}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="edit" onClick={(e) => { e.preventDefault(); console.log('Delete'); }}>
          <DeleteIcon />
        </IconButton>
      </ListItemIcon>
    </ListItemButton>
  </ListItem>)
}

const TransactionList = () => {
  const { id } = useParams<{ id: string }>();
  const [transactions, setTransactions] = useState([] as any[]);
  const [groupedTransactions, setGroupedTransactions] = useState<any[]>([]);

  const getAllTransactions = useCallback(async () => {
    const transactions = await transactionService.getAll(id!);
    setTransactions(transactions);
    const grouped = groupBy(transactions, getGroupNameOfTransactionDate);
    setGroupedTransactions(grouped);
  }, [id]);

  const createTransaction = async (data: any): Promise<void> => {
    // TODO: fix
    data.amount = parseFloat(data.amount);
    await transactionService.create(id!, { ...data });
    await getAllTransactions();
  }

  useEffect(() => {
    getAllTransactions();
  }, [getAllTransactions]);

  return (
    <Container>
      <CreateTransactionDialog onSave={createTransaction} />
      {groupedTransactions.map((group) => {
        return (<List key={group.name} sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListSubheader style={{ textAlign: 'right'}}>{group.name}</ListSubheader>
          <Divider />
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {group.items.map((transaction:any) => <TransactionListItem key={transaction.id} {...transaction} />)}
          </List>
        </List>);
      })}
    </Container>
  );
}

export default TransactionList;
