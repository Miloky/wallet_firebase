import { useState, ChangeEvent } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import useCategories from "./hooks/use-categories";
import TransactionTypeControl from './transaction-type-control';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

interface CreateTransactionDialogProps {
  // TODO: add types
  onSave: (data: any) => Promise<void>;
}

interface CreateTransactionDialogState {
  type: string;
  amount: number;
  description: string;
  category: string;
  transactionDate: Date | null;
}

const getDefaultState = (): CreateTransactionDialogState => ({
  description: "",
  amount: 0,
  type: "expense",
  category: "",
  transactionDate: new Date()
});

const CreateTransactionDialog = (props: CreateTransactionDialogProps) => {
  const { onSave } = props;
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<CreateTransactionDialogState>(
    getDefaultState()
  );

  const { categories } = useCategories();

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

  const setState = (name: string, value: any): void =>
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  const setInputValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ): void => {
    if (!e) return;
    const name = e.target.name;
    const value = e.target.value;
    setState(name, value);
  };

  const transactionDateChangeHandler = (date: Date | null): void => {
    if (!date) return;
    const name = 'transactionDate';
    const value = date;
    setState(name, value);
  }

  const setTransactionType = (type: string): void => {
    setFormState((prev) => ({ ...prev, type }));
  };

  const getOptions = () => {
    // TODO: Add types
    const result: any[] = categories.reduce((result, val) => {
      result.push(<ListSubheader key={val.id}>{val.name}</ListSubheader>);
      result.push(
        ...val.sub.map((c: any) => (
          <MenuItem style={{ paddingLeft: "40px" }} key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))
      );
      return result;
    }, [] as any[]);
    return result;
  };

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}
      >
        <Button variant="text" onClick={handleClickOpen}>
          Add new transaction
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            await onSave(formState);
            handleClose();
          },
        }}
      >
        <DialogContent>
          <TransactionTypeControl
            type={formState.type}
            onChange={setTransactionType}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="amount"
            name="amount"
            label="Amount"
            type="text"
            fullWidth
            variant="standard"
            onChange={setInputValue}
            value={formState.amount}
          />
          <FormControl sx={{ minWidth: 120 }} fullWidth style={{ marginTop: '10px' }}>
            <MobileDateTimePicker orientation="landscape" ampm={false} label="Date" name="transactionDate" onChange={transactionDateChangeHandler} value={formState.transactionDate} />
          </FormControl>
          <FormControl sx={{ minWidth: 120 }} fullWidth style={{ marginTop: '10px' }}>
            <InputLabel htmlFor="grouped-select">Category</InputLabel>
            <Select
              onChange={setInputValue}
              name="category"
              id="category"
              label="Category"
            >
              {getOptions()}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={setInputValue}
            value={formState.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateTransactionDialog;
