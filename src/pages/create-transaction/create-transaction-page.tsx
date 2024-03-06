import {
  Button,
  Card,
  Container,
  FormControl,
  IconButton,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import TransactionTypeControl from "../../transaction-type-control";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { ChangeEvent, useState } from "react";
import CategorySelect from "./category-select";
import transactionService from "../../services/transaction-service";
import { useNavigate, useParams } from "react-router-dom";
import useAccount from "./use-account";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface State {
  type: string;
  amount: number;
  description: string;
  category: string;
  transactionDate: Date | null;
}

const getDefaultState = (): State => ({
  description: "",
  amount: 0,
  type: "expense",
  category: "",
  transactionDate: new Date(),
});

const CreateTransactionPage = () => {
  const { accountId } = useParams<Record<"accountId", string>>();
  const { account } = useAccount({ id: accountId! });
  const navigate = useNavigate();

  const [isSaving, setSaving] = useState<boolean>(false);
  const [formState, setFormState] = useState<State>(getDefaultState);

  const setDefaultFormState = () => {
    const defaultState = getDefaultState();
    setFormState(defaultState);
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

  const saveHandler = async (): Promise<void> => {
    setSaving(true);
    setDefaultFormState();
    transactionService.create(accountId!, formState);
    setSaving(false);
    console.log("formState", formState);
  };

  const navigateToAccount = (): void => navigate(`/accounts/${accountId}`);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
        width: "100%",
      }}
    >
      <Container style={{paddingTop: '1px', paddingBottom: '10px'}}>
        <IconButton aria-label="delete" size="small" onClick={navigateToAccount}>
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
      </Container>
      <Container style={{ flexGrow: 1, overflow: "auto" }}>
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
            slots={{
              toolbar: undefined,
            }}
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
      </Container>
      <Card
        component={Container}
        style={{
          overflow: "visible",
          padding: "10px 25px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
        }}
        elevation={3}
      >
        <img
          // TODO: Ask conformation if data was filled.
          onClick={navigateToAccount}
          src={account?.logo}
          style={{ height: "36px", marginRight: "auto" }}
        />
        <Button
          variant="contained"
          onClick={saveHandler}
          style={{ marginRight: "10px" }}
          disabled={isSaving}
        >
          Save
        </Button>
        <Button disabled={isSaving} variant="outlined" onClick={navigateToAccount}>
          Cancel
        </Button>
      </Card>
    </div>
  );
};

export default CreateTransactionPage;
