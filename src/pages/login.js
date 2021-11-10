import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { AuthContext } from "../context/userInfo";
import { api } from "../axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setError] = useState("");
  const { userInfo, login, logout } = useContext(AuthContext);
  //const AuthContextProvider = useContext(AuthContext) here we should use dot .
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const error = validation();
    if (error.length > 0) {
      setError(error);
      return;
    } else setError("");

    api.post("login", {
      email: email,
      password: password,
    }).then((res) => {
      login(res.data.token);
      history.push("/authors");
      console.log(`this is res   ${res}`);
      console.log(res);
    });
  };

  const validation = () => {
    const errors = [];
    if (email.length === 0) {
      errors.push("email is required");
    }
    if (password.length === 0) {
      errors.push("password is required");
    }
    if (password.length <= 8) {
      errors.push("password must be at least 8 characters");
    }
    return errors;
  };

  return (
    <div className="logPage">
      <form className="logPage-wrapper" onSubmit={submitHandler}>
        <h1 style={{ marginLeft: "50px" }}>Login</h1> <br />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <br />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br /> <br />
        <Button
          variant="contained"
          type="submit"
          style={{ marginLeft: "50px" }}
        >
          Login
        </Button>
        <br /> <br />
      </form>
      {errors && <p style={{ color: "red" }}>{errors.join("\n")}</p>}
    </div>
  );
};

export default Login;
