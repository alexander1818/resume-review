import { BrowserRouter, Outlet } from "react-router-dom";
import { Container } from "@mui/material";

import InternalRouter from "./router/Router";
import { useStyles } from "./AppStyles";

const App = () => {
  const styles = useStyles();
  return (
    <BrowserRouter>
      <Container maxWidth={"md"} className={styles.container}>
        <InternalRouter />
        <Outlet />
      </Container>
    </BrowserRouter>
  );
};

export default App;
