import { useEffect, useContext, useState } from "react";

//contexts
import DarkModeContext, { DarkModeProvider } from "contexts/DarkModeContext";
import UserContext, { UserProvider } from "../contexts/UserContext";
import AlertContext, { AlertProvider } from "contexts/AlertContext";

//components
import Header from "components/Header";
import NextNProgress from "nextjs-progressbar";
import Alert from "components/Alert";

import { axiosInterceptors } from "helpers/axios";

//react query
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//material ui
import { Box, CssBaseline } from "@mui/material";

import "../styles/globals.css";

axiosInterceptors();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#ae0d2f" showOnShallow={false} height={4} />
      <DarkModeProvider>
        <UserProvider>
          <AlertProvider>
            <AppData Component={Component} pageProps={pageProps} />
          </AlertProvider>
        </UserProvider>
      </DarkModeProvider>
    </>
  );
}

function AppData({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const { user, setUser, logout } = useContext(UserContext);
  //Estados y funciones del alerta
  const { alertSms, alertaMensaje, closeAlertSms, type, typeAlert } =
    useContext(AlertContext);
  const { mode, colorMode, theme } = useContext(DarkModeContext);

  useEffect(() => {
    document.body.style.backgroundColor =
      theme.palette.mode === "light"
        ? "#f5f5f5"
        : theme.palette.background.default;
  }, [theme.palette.background.default, theme.palette.mode]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Box
          sx={{
            width: "100%",
            bgcolor: `${
              theme.palette.mode === "light" ? "#f5f5f5" : "background.default"
            }`,
            color: "text.secondary",
            overflow: "auto",
          }}
        >
          <Header
            colorMode={colorMode}
            theme={theme}
            mode={mode}
            alertSms={alertSms}
            user={user}
            setUser={setUser}
            logout={logout}
          />
          <CssBaseline />

          <Alert
            alertaMensaje={alertaMensaje}
            typeAlert={typeAlert}
            closeAlertSms={closeAlertSms}
            type={type}
          />

          <Component {...pageProps} user={user} />
        </Box>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
