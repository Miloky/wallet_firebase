import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import 'simplebar-react/dist/simplebar.min.css';
import Main from './pages/index';
const theme = createTheme();

const TestComponent = () => {
  const { id } = useParams();
  return <span>{id}</span>;
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' Component={() => Main.getLayout(<Main />)} />
          <Route
            path='/test/:id'
            Component={() => Main.getLayout(<TestComponent />)}
          ></Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
