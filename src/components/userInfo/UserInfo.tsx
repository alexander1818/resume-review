import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Box, Skeleton, Typography } from "@mui/material";

import { userRepos } from "../../utils/actions";
import { useStyles } from "./styles";

import RecentRepos from "./components/RecentRepos";
import Languages from "./components/Languages";

const UserInfo: FC = () => {
  const styles = useStyles();
  const { state } = useLocation();
  const { userLogin, name, created_at, public_repos } = state;
  const registeredDate = new Date(created_at).toLocaleDateString();

  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState<any>({});

  const fetchRepos = async () => {
    setLoading(true);
    //Recent 10 repos & Languages from each repo of user
    const reposData = await userRepos(userLogin);
    setRepos(reposData);
    setLoading(false);
  };

  useEffect(() => {
    (async () => await fetchRepos())();
  }, []);

  return loading ? (
    <Box className={styles.skeleton}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  ) : (
    <Box className={styles.content}>
      <Box style={{ width: "100%" }}>
        <Typography variant="h5" className={styles.username}>
          <span className={styles.language_amount}>{userLogin}</span>
        </Typography>
        <Typography>
          Username:{" "}
          <span className={styles.language_amount}>{name ? name : "N/A"}</span>
        </Typography>
        <Typography>
          Public repos:
          <span className={styles.language_amount}>{public_repos}</span>
        </Typography>
        <Typography>
          Registered at:
          <span className={styles.language_amount}>{registeredDate}</span>
        </Typography>
      </Box>
      {repos.calculatedLanguages && (
        <Languages languages={repos.calculatedLanguages} />
      )}
      {repos.recentRepos && <RecentRepos repos={repos.recentRepos} />}
    </Box>
  );
};

export default UserInfo;
