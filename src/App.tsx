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
import type { LoaderFunctionArgs } from "react-router-dom";
import TransactionsPage from "./transaction-list";

const theme = createTheme();

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!auth.currentUser) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/signin?" + params.toString());
  }
  return null;
}

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader: protectedLoader,
    Component: () => Home.getLayout(<Home />),
  },
  {
    path:"/accounts/:id",
    Component: () => Home.getLayout(<TransactionsPage />)
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
        {/* <Routes>
          <Route
            path="/"
            loader={protectedLoader}
            Component={() => Home.getLayout(<Home />)}
          />
          <Route
            path="/accounts/:id"
            element={Home.getLayout(<CheckboxList />)}
          />
          <Route path="/todo" element={Home.getLayout(<h1>Todo</h1>)} />
          <Route path="/login" Component={() => <LoginPage />} />
          <Route path="*" element={Home.getLayout(<h1>404 Not found</h1>)} />
        </Routes> */}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
