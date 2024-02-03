import { FC, memo } from "react";

import { Box, Typography } from "@mui/material";

import { useStyles } from "../styles";

type TLanguage = {
  [x: string]: number;
};

type TProps = {
  languages: TLanguage;
};

const Languages: FC<TProps> = ({ languages }) => {
  const styles = useStyles();
  return (
    <Box>
      <Typography variant="h5">Languages</Typography>
      {languages &&
        Object.keys(languages).map((lang) => (
          <Box key={`${lang}_${languages[lang]}`}>
            <Typography>
              {lang}:{" "}
              <span className={styles.language_amount}>
                {" "}
                {languages[lang].toFixed(1)}%
              </span>
            </Typography>
          </Box>
        ))}
    </Box>
  );
};

export default memo(Languages);
