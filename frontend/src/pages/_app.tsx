import "@/styles/globals.css";
import type {AppProps} from "next/app";
import dynamic from "next/dynamic";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import Header from "@/components/Header";
import {ConfigProvider, ThemeConfig} from "antd";

const mainTheme: ThemeConfig = {
    token: {
        colorPrimary: 'orange'
    }
}

function App({Component, pageProps}: AppProps) {


    const client = new ApolloClient({
        uri: "http://localhost:4000/graphql",
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <ConfigProvider theme={mainTheme}>
                <Header/>
                <Component {...pageProps} />
            </ConfigProvider>
        </ApolloProvider>
    );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), {ssr: false});
