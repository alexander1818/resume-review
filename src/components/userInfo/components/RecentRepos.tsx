import { FC, memo } from "react";
import { Link } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";

import { useStyles } from "../styles";

type TShortRepoType = {
  id: number;
  name: string;
  html_url: string;
};

type TProps = {
  repos: TShortRepoType[];
};

const RecentRepos: FC<TProps> = ({ repos }) => {
  const styles = useStyles();
  return (
    <Grid>
      <Typography variant="h5">Recent repositories</Typography>
      {repos &&
        repos.map((repo, index) => (
          <Box key={repo.id} className={styles.repo_box}>
            <Typography>
              <span>{index + 1}.</span> {repo.name}
            </Typography>
            <Link to={repo.html_url} className={styles.repo_link}>
              Visit repository
            </Link>
          </Box>
        ))}
    </Grid>
  );
};

export default memo(RecentRepos);
