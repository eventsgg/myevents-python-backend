import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/styles';
import { StylesProvider } from "@material-ui/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from 'react-apollo';

import withApolloClient from '../src/Libs/with-apollo-client';
import theme from '../src/Libs/theme';

const isProduction =  process.env.NODE_ENV === 'production';
const MobxDevTools = !isProduction ? require('mobx-react-devtools').default : () => null;

class MyApp extends App {
    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');

        if (jssStyles) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps, apolloClient } = this.props;

        return (
            <Container>
                <Head>
                    <title>My Events</title>
                </Head>

                <ApolloProvider client={apolloClient}>
                    <ThemeProvider theme={theme}>
                        <StylesProvider>
                            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                            <CssBaseline />
                            <Component {...pageProps} />
                            <MobxDevTools />
                        </StylesProvider>
                    </ThemeProvider>
                </ApolloProvider>
            </Container>
        );
    }
}

export default withApolloClient(MyApp);