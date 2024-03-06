import "./App.css";
import {
  RouterProvider,
  redirect,
  createBrowserRouter,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "simplebar-react/dist/simplebar.min.css";
import Home from "./pages/home";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SignInPage from "./pages/signin";
import { auth } from "./services/firebase-service";
import { onAuthStateChanged, signOut } from "firebase/auth";
import TransactionsPage from "./transaction-list";
import CreateTransactionPage  from "./pages/create-transaction/create-transaction-page";
import UnderConstructionPage from "./pages/under-construction-page";
import UpcomingFeaturesPage from "./pages/upcoming-features-page";

const theme = createTheme();

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: () => Home.getLayout(<Home />),
  },
  {
    path: "/under-construction",
    Component: () => Home.getLayout(<UnderConstructionPage />),
  },
  {
    path: "/upcoming-features",
    Component: () => Home.getLayout(<UpcomingFeaturesPage />),
  },
  {
    path: "/accounts/:id",
    Component: () => Home.getLayout(<TransactionsPage />),
  },
  {
    path: "/accounts/:accountId/create-transaction",
    Component: () => Home.getLayout(<CreateTransactionPage />),
  },
  {
    path: "/signin",
    Component: () => <SignInPage />,
  },
  {
    path: "/signout",
    element: <span />,
    loader: async () => {
      await signOut(auth);
      return redirect("/");
    },
  },
  {
    path: "*",
    element: <h1>404 Not Found!</h1>,
  },
]);

const App = () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      router.navigate("/signin");
    }
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <RouterProvider
          router={router}
          fallbackElement={<p>Initial Load...</p>}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
