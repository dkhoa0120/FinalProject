import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";
import { CategoryProvider } from "./context/CategoryContext";
import { NotificationProvider } from "./context/NotificationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CategoryProvider>
      <UserProvider>
        <NotificationProvider>
          <ProSidebarProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ProSidebarProvider>
        </NotificationProvider>
      </UserProvider>
    </CategoryProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
