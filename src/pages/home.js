import React, { useContext } from "react";
import { AuthContext } from "../context/userInfo";
import { Button } from "@mui/material";

const Home = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <h1 style={{ marginLeft: "50px" }}>Hello</h1>
      <Button
        onClick={logout}
        variant="contained"
        style={{ marginLeft: "50px" }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Home;
