import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Loading } from "@/components/Loading";
import { ToastRequest } from "@/components/ToastRequest";
import { createTheme, ThemeProvider } from "@mui/material";
import { grayColor, primaryColor, secondColor } from "@/utils/constant/colors";
import { QueryClient, QueryClientProvider } from "react-query";
import { DashboardPanel } from "@/components/console/DashboardPanel";

let theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      light: primaryColor,
      dark: primaryColor,
      contrastText: primaryColor
    },
    secondary: {
      main: secondColor,
      light: secondColor,
      dark: secondColor,
      contrastText: secondColor
    }
  }
});

theme = createTheme(theme, {
  palette: {
    gray: theme.palette.augmentColor({
      color: {
        main: grayColor
      },
      name: "gray"
    })
  }
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
      <DashboardPanel></DashboardPanel>
      <ToastRequest></ToastRequest>
      <Loading></Loading>
    </ThemeProvider>
  );
}
