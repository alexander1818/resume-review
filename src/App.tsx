import { Box } from "@mui/material";
import { BrowserRouter, Outlet } from "react-router-dom";

import InternalRouter from "./router/Router";

const App = () => {
  return (
    <BrowserRouter>
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
        <InternalRouter />
        <Outlet />
      </Box>
    </BrowserRouter>
  );
};

export default App;
