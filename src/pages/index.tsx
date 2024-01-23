import * as React from 'react';
import { Box, Container, Grid, TextField } from '@mui/material';
import DashboardLayout from '../layouts/layout';
import Card from '../components/card';
import { useEffect } from 'react';
import accountService, { Account } from '../services/account-service';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function FormDialog(props: any) {
  const { temp } = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [balance, setBalance] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setName('');
    setBalance(null);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(
              (formData as any).entries()
            ) as Account;
            await accountService.create(formJson);
            await temp();
            handleClose();
          },
        }}
      >
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin='dense'
            id='name'
            name='name'
            label='Name'
            type='text'
            fullWidth
            variant='standard'
            onChange={(e) => setName(e.target.value as any)}
            value={name}
          />
          <TextField
            autoFocus
            required
            margin='dense'
            id='balance'
            name='balance'
            label='Balance'
            type='text'
            fullWidth
            variant='standard'
            onChange={(e) => setBalance(e.target.value as any)}
            value={balance}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const Page = () => {
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const isInitiated = React.useRef(false);

  const loadAccounts = () =>
    accountService.getAll().then((x) => setAccounts(x));

  useEffect(() => {
    if (isInitiated.current) {
      loadAccounts();
    }
    isInitiated.current = true;
  }, []);

  const deleteHandler = async (id: string): Promise<void> => {
    await accountService.delete(id);
    await loadAccounts();
  };

  return (
    <>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth='xl'>
          <Grid container>
            <Grid item xs={12}>
              <FormDialog temp={loadAccounts} />
            </Grid>
          </Grid>
          <Grid container>
            {accounts.map((acc) => (
              <Grid
                key={acc.id}
                item
                xs={12}
                lg={4}
                alignItems='center'
                justifyContent='center'
              >
                <Card id={acc.id} name={acc.name} onDelete={deleteHandler} />
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
