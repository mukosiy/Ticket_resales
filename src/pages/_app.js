import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../theme";
import Nav from "../components/nav";
import Grid from "@material-ui/core/Grid";
import cookie from "cookie";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head title="My page">
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Nav {...pageProps} />
        <Grid container direction="row" justify="center" alignitmes="center">
          <Component {...pageProps} />
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const cookies = ctx.ctx.req?.headers.cookie;
  if (cookies) {
    const parsed = JSON.parse(cookie.parse(cookies).auth);
    return {
      pageProps: {
        auth: true,
        id: parsed.userId,
        name: parsed.userName,
        email: parsed.userEmail,
      },
    };
  }

  return { pageProps: {} };
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
