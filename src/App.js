import { Switch, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import { AuthContext } from "./context/userInfo";
import React, { useContext } from "react";
import Authors from "./pages/Authors";

function App() {
  const { isAuth, logout } = useContext(AuthContext);
  let routes;

  if (!isAuth) {
    routes = <Login />;
  }

  if (isAuth) {
    routes = (
      <Switch>
        <Route exact={true} path="/">
          <h1 style={{ fontSize: "5rem" }}>This is the default url</h1>
          <br/>
          <button onClick={logout}>Log out</button>
        </Route>
        <Route path="/home">
          <Home />
        </Route>

        <Route path="/authors">
          <Authors />
        </Route>
      </Switch>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {routes}
    </div>
  );
}

export default App;
