import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./context/userInfo";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthContextProvider>
                <App />
                {/* it will give the app the values  */}
            </AuthContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
