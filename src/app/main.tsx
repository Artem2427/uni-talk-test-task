import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import {
  QueryClient,
  QueryClientProvider as QueryProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CssBaseline from "@mui/material/CssBaseline";
import "./index.css";
import App from "./App.tsx";
import store from "../store";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </QueryProvider>
  </StrictMode>
);
