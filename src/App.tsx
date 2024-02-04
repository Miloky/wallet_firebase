import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import 'simplebar-react/dist/simplebar.min.css';
import Home from './pages/home';
import CheckboxList from './transaction-list';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const theme = createTheme();

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Routes>
            <Route path='/' Component={() => Home.getLayout(<Home />)} />
            <Route
              path='/accounts/:id'
              Component={() => Home.getLayout(<CheckboxList />)}
            />
            <Route
              path='/todo'
              Component={() => Home.getLayout(<h1>Todo</h1>)}
            />
            <Route path='*'
              Component={() => Home.getLayout(<h1>404 Not found</h1>)}
            />
          </Routes>
        </LocalizationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
