import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { CartProvider } from "./context/CartContext";
import "./styles/main.css";
import "./styles/admin.css"

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/profile`,
        audience: `https://${domain}/api/v2/`,
        scope: "openid profile email read:current_user",
      }}
    > */}
      <CartProvider>
        <App />
      </CartProvider>
    {/* </Auth0Provider> */}
  </React.StrictMode>
);