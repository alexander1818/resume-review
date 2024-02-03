import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

import { octokit } from "../../api/API";
import { useStyles } from "./styles";

const Home: FC = () => {
  const navigate = useNavigate();
  const styles = useStyles();
  const [loading, setLoading] = useState<boolean>(false);

  const usernameSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
  });

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<{ username: string }>({
    values: { username: "" },
    resolver: yupResolver(usernameSchema),
    mode: "onChange",
  });

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleSubmit(async (data) => await fetchUser(data))();
    }
    return;
  };

  const fetchUser = async ({ username }: { [x: string]: string }) => {
    setLoading(true);
    try {
      const response = await octokit.request(`GET /users/${username}`);
      const { login, name, created_at, public_repos } = response.data;

      navigate(`/${username}`, {
        state: { userLogin: login, name, created_at, public_repos },
      });
    } catch (e) {
      setError("username", { message: `User ${username} not found` });
    }
    setLoading(false);
  };

  return (
    <Box className={styles.home_root}>
      <Typography variant="body1">
        An application to search and view brief information about a GitHub user,
        to continue enter the GitHub username in the text box.
      </Typography>
      <Box style={{ position: "relative" }}>
        <Controller
          {...register("username")}
          name="username"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Box>
              <AccountCircle
                sx={{
                  color: !error ? "#14B938" : "#FF3B30",
                  mr: 0.5,
                  my: 0.5,
                }}
              />
              <TextField
                placeholder={"Username..."}
                variant="standard"
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyEnter}
                error={!!error}
              />
              {error && (
                <Typography variant="caption" className={styles.error_text}>
                  {error.message}
                </Typography>
              )}
            </Box>
          )}
        />
      </Box>
      <LoadingButton
        size="medium"
        onClick={handleSubmit(fetchUser)}
        loading={loading}
        loadingIndicator="Loading…"
        variant="outlined"
        color={!errors.username ? "success" : "error"}
      >
        <span>Fetch data</span>
      </LoadingButton>
    </Box>
  );
};

export default Home;
