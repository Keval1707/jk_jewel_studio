import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./features/ToastContext";
import "./styles/main.css";
import "./styles/admin.css";
import LoadingScreen from "./components/LoadingScreen"; // ✅ Imported here

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

const Root = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    // <React.StrictMode>
    //   {/* <Auth0Provider
    //     domain={domain}
    //     clientId={clientId}
    //     authorizationParams={{
    //       redirect_uri: \`\${window.location.origin}/profile\`,
    //       audience: \`https://\${domain}/api/v2/\`,
    //       scope: "openid profile email read:current_user",
    //     }}
    //   > */}
    //     <CartProvider>
    //       <App />
    //     </CartProvider>
    //   {/* </Auth0Provider> */}
    // </React.StrictMode>
    <ToastProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ToastProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
