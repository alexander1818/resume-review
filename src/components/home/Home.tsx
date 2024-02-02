import React, { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import { octokit } from "../../api/API";

const Home: FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState<unknown>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await octokit.request(`GET /users/${username}`);
      const { login, name, created_at, public_repos } = response.data;
      setUser(response.data);

      navigate(`/${username}`, {
        state: { userLogin: login, name, created_at, public_repos },
      });
    } catch (e) {
      console.log("ERROR >>>", e);
      setUser(null);
    }
    setLoading(false);
  };

  return (
    <Box
      style={{
        height: "100Vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Box>
        <AccountCircle
          sx={{ color: user ? "green" : "red", mr: 0.5, my: 0.5 }}
        />
        <TextField
          id="input-with-icon-textfield"
          label=""
          color={"warning"}
          placeholder={"Username..."}
          variant="standard"
          value={username}
          onChange={handleChange}
        />
      </Box>
      <LoadingButton
        size="medium"
        onClick={() => fetchUser()}
        loading={loading}
        loadingIndicator="Loading…"
        variant="outlined"
      >
        <span>Fetch data</span>
      </LoadingButton>
    </Box>
  );
};

export default Home;
