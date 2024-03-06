import { useState, ChangeEvent } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import TransactionTypeControl from "./transaction-type-control";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import CreateOnNewPage from "./create-on-page";
import CategorySelect from "./pages/create-transaction/category-select";
import { useParams } from "react-router-dom";
import useAccount from "./pages/create-transaction/use-account";

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
  transactionDate: new Date(),
});

const CreateTransactionDialog = (props: CreateTransactionDialogProps) => {
  const { onSave } = props;
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<CreateTransactionDialogState>(
    getDefaultState()
  );

  const { id } = useParams<{ id: string }>();
  const { account } = useAccount({ id: id! });

  const setDefaultFormState = () => {
    const defaultState = getDefaultState();
    setFormState(defaultState);
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
    e:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ): void => {
    if (!e) return;
    const name = e.target.name;
    const value = e.target.value;
    setState(name, value);
  };

  const transactionDateChangeHandler = (date: Date | null): void => {
    if (!date) return;
    const name = "transactionDate";
    const value = date;
    setState(name, value);
  };

  const setTransactionType = (type: string): void => {
    setFormState((prev) => ({ ...prev, type }));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: 'center'
        }}
      >
        <img src={account?.logo} style={{ height: "35px" }} />
        <Typography>{account?.balance}{' '}{account?.currencyCode}</Typography>
        <CreateOnNewPage />
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
            variant="outlined"
            size="small"
            required
            margin="dense"
            id="amount"
            name="amount"
            label="Amount"
            type="text"
            fullWidth
            onChange={setInputValue}
            value={formState.amount}
          />
          <FormControl
            size="small"
            sx={{ minWidth: 120 }}
            fullWidth
            style={{ marginTop: "10px" }}
          >
            <MobileDateTimePicker
              slotProps={{ textField: { size: "small" } }}
              orientation="landscape"
              ampm={false}
              label="Date"
              name="transactionDate"
              onChange={transactionDateChangeHandler}
              value={formState.transactionDate}
            />
          </FormControl>
          <CategorySelect
            name="category"
            value={formState.category}
            onChange={setState}
          />
          <TextField
            style={{ marginTop: "10px" }}
            size="small"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
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
