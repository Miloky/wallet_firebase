import { useState, ChangeEvent } from "react";
import { Box, Container, Grid, IconButton, TextField } from "@mui/material";
import DashboardLayout from "../layouts/layout";
import Card from "../components/card";
import { useEffect } from "react";
import accountService, { Account } from "../services/account-service";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";

interface CreateAccountDialogProps {
  onSave: (val: Omit<Account, 'id'>) => Promise<void>;
}
interface CreateAccountDialogState {
  name: string;
  balance: number;
}

const getDefaultFormState = (): CreateAccountDialogState => ({
  name: "",
  balance: 0,
});

const CreateAccountDialog = (props: CreateAccountDialogProps) => {
  const { onSave } = props;
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<CreateAccountDialogState>(
    getDefaultFormState()
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const converters = {
      balance: parseFloat,
    };
    const name = e.target.name as keyof typeof converters;
    const value = converters[name](e.target.value);

    setFormState((prevState: CreateAccountDialogState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "row", justifyContent: "end" }}
      >
        <IconButton onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            await onSave({ name: formState.name, balance: formState.balance });
            handleClose();
          },
        }}
      >
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChangeHandler}
            value={formState.name}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="balance"
            name="balance"
            label="Balance"
            type="text"
            fullWidth
            variant="standard"
            onChange={onChangeHandler}
            value={formState.balance}
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

const Page = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const loadAccounts = async () => {
    const acc = await accountService.getAll();
    setAccounts(acc);
  };

  useEffect(() => {
    loadAccounts();
  }, []);

  const deleteHandler = async (id: string): Promise<void> => {
    await accountService.delete(id);
    await loadAccounts();
  };

  const accountCreateHandler = async (account: Omit<Account, 'id'>): Promise<void> => {
    await accountService.create(account);
    await loadAccounts();
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={12}>
              <CreateAccountDialog onSave={accountCreateHandler} />
            </Grid>
          </Grid>
          <Grid container>
            {accounts.map((acc) => (
              <Grid
                key={acc.id}
                item
                xs={12}
                lg={4}
                alignItems="center"
                justifyContent="center"
              >
                <Card
                  id={acc.id}
                  name={acc.name}
                  balance={acc.balance as any as string}
                  onDelete={deleteHandler}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
