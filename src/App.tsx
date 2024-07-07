import { Provider } from "react-redux";
import "./index.css";
import { store } from "./store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Auth/Login";
import Product from "./Product/Product";
import Cart from "./Cart/Cart";
import ConfirmCheckout from "./Checkout/ConfirmCheckout";
import SuccessPage from "./EndPages/SuccessPage";
import FailurePage from "./EndPages/FailurePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <ProtectedRoute>
        <Product />
      </ProtectedRoute>
    ),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "cart",
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "confirmCheckout",
    element: (
      <ProtectedRoute>
        <ConfirmCheckout />
      </ProtectedRoute>
    ),
  },
  {
    path: "orderSuccess",
    element: (
      <ProtectedRoute>
        <SuccessPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "orderFailed",
    element: (
      <ProtectedRoute>
        <FailurePage />
      </ProtectedRoute>
    ),
  },
]);

const clientId = process.env.REACT_APP_OAUTH_CLIENT_ID;
function App() {
  return (
    <GoogleOAuthProvider clientId={clientId!}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
