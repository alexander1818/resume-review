import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const UserInfo: FC = () => {
  const { state } = useLocation();
  const { userLogin, name, created_at, public_repos } = state;
  const registeredDate = new Date(created_at).toLocaleDateString();

  return (
    <Box>
      <Typography>User login: {userLogin}</Typography>
      <Typography>Username: {name}</Typography>
      <Typography>Public repos: {public_repos}</Typography>
      <Typography>Registered at: {registeredDate}</Typography>
    </Box>
  );
};

export default UserInfo;
