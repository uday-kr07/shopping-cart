import { BrowserRouter } from "react-router-dom";
import ShoppingCartProvider from "./context";
import { createRoot } from "react-dom/client";
import './index.css'
import App from './App.jsx'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShoppingCartProvider>
      <App />
    </ShoppingCartProvider>
  </BrowserRouter>
);
