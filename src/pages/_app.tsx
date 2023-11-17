import type { AppProps } from "next/app";
import { Loading } from "@/components/Loading";
import { createTheme, ThemeProvider } from "@mui/material";
import { grayColor, primaryColor, secondColor } from "@/utils/constant/colors";
import { QueryClient, QueryClientProvider } from "react-query";
import { DashboardPanel } from "@/components/console/DashboardPanel";
import {GlobalStyle, ToastRequest} from "@/styles/global";
import 'react-toastify/dist/ReactToastify.css';

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
        <GlobalStyle />
        <Component {...pageProps} />
        <ToastRequest />
      </QueryClientProvider>
      <DashboardPanel></DashboardPanel>
      <Loading></Loading>
    </ThemeProvider>
  );
}
