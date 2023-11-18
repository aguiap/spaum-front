import type {AppProps} from "next/app";
import {Loading} from "@/components/Loading";
import {createTheme, ThemeProvider} from "@mui/material";
import {grayColor, primaryColor, secondColor} from "@/utils/constant/colors";
import {QueryClient, QueryClientProvider} from "react-query";
import {DashboardPanel} from "@/components/console/DashboardPanel";
import {GlobalStyle, ToastRequest} from "@/styles/global";
import 'react-toastify/dist/ReactToastify.css';
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {validateRefreshAuthentication} from "@/utils/functions";

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

export default function App({Component, pageProps}: AppProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("accessToken");
    const expiration = searchParams.get("expiration");
    const username = searchParams.get("username");

    useEffect(() => {
        validateRefreshAuthentication(router, token, expiration, username);
    }, [router, token != null, expiration != null, username != null]);

    return (
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <GlobalStyle/>
                <Component {...pageProps} />
                <ToastRequest/>
            </QueryClientProvider>
            <DashboardPanel></DashboardPanel>
            <Loading></Loading>
        </ThemeProvider>
    );
}
