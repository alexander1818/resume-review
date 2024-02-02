import React from 'react';

import {Box, TextField} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';

import {httpQuery} from "./api/fetchWrapper";
import {API} from "./api/API";

type TSuccess<S> = {
    success: S;
};

type TError = {
    error: string;
};

type TApiResponses<T> = TSuccess<T> & TError;

const App = () => {
    const [loading, setLoading] = React.useState(false);
    const fetchUsers = async () => {
        setLoading(true);
        const result = await httpQuery<{ [x: string]: string }, TApiResponses<any>>(
            'GET',
            API.users,
        );
        setLoading(false);
        return result;
    }

  return (
    <Box style={{height: '100Vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', gap: 20}}>
        <Box>
      <AccountCircle sx={{ color: 'red', mr: 0.5, my: 0.5 }} />
      <TextField
          id="input-with-icon-textfield"
          label=""
          color={'warning'}
          placeholder={'Username...'}
          variant="standard"
      />
        </Box>
        <LoadingButton
            size="medium"
            onClick={() => fetchUsers()}
            loading={loading}
            loadingIndicator="Loading…"
            variant="outlined"
        >
            <span>Fetch data</span>
        </LoadingButton>
    </Box>
  );
}

export default App;
