import { useState, ChangeEvent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
// TODO: Refactor import
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { TransactionType } from './transaction-type';

interface CreateTransactionDialogProps {
  // TODO: add types
  onSave: (data: any) => Promise<void>;
}

interface TransactionTypeControlProps {
  // Transaction type. Example: income, expense, transfer.
  type: string;
  onChange: (type: string) => void;
}

const TransactionTypeControl = (props: TransactionTypeControlProps) => {
  const { type, onChange } = props;

  const handleChange = (e: any, newAlignment: string) => {
    onChange(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={type}
      exclusive
      fullWidth
      onChange={handleChange}
    >
      <ToggleButton value={TransactionType.Expense}>Expense</ToggleButton>
      <ToggleButton value={TransactionType.Income}>Income</ToggleButton>
      <ToggleButton value={TransactionType.Transfer}>Transfer</ToggleButton>
    </ToggleButtonGroup>
  );
}


interface CreateTransactionDialogState {
  type: string;
  amount: number;
  description: string;
  category: string;
}

const getDefaultState = (): CreateTransactionDialogState => ({
  description: '',
  amount: 0,
  type: 'expense',
  category: ''
});


const CreateTransactionDialog = (props: CreateTransactionDialogProps) => {
  const { onSave } = props;
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<CreateTransactionDialogState>(getDefaultState());

  const setDefaultFormState = () => {
    const defaultState = getDefaultState();
    setFormState(defaultState);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDefaultFormState();
  };

  const setInputValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    // TODO: Add validation
    // TODO: Add types
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const setTransactionType = (type: string): void => {
    setFormState((prev) => ({ ...prev, type }))
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
        <Button variant='text' onClick={handleClickOpen}>
          Add new transaction
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            await onSave(formState);
            handleClose();
          },
        }}
      >
        <DialogTitle>Create Transaction</DialogTitle>
        <DialogContent>
          <TransactionTypeControl type={formState.type} onChange={setTransactionType} />
          <TextField
            autoFocus
            required
            margin='dense'
            id='amount'
            name='amount'
            label='Amount'
            type='text'
            fullWidth
            variant='standard'
            onChange={setInputValue}
            value={formState.amount}
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='description'
            name='description'
            label='Description'
            type='text'
            fullWidth
            variant='standard'
            onChange={setInputValue}
            value={formState.description}
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='category'
            name='category'
            label='Category'
            type='text'
            fullWidth
            variant='standard'
            onChange={setInputValue}
            value={formState.category}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateTransactionDialog;
