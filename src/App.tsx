import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import 'simplebar-react/dist/simplebar.min.css';
import Main from './pages/index';
import CheckboxList from './transaction-list';

const theme = createTheme();

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' Component={() => Main.getLayout(<Main />)} />
          <Route
            path='/test/:id'
            Component={() => Main.getLayout(<CheckboxList />)}
          ></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
