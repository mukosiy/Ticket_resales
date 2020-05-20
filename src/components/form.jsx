import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  changeAuth: {
    color: "gray",
  },
}));

export default function Form({
  isSignIn,
  nameRef,
  emailRef,
  passRef,
  authMe,
  changeAuthType,
  text,
  type,
  show,
}) {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {isSignIn ? <LockOutlinedIcon /> : <LockOpenOutlinedIcon />}
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignIn ? "Sign in" : "Sign up"}
          </Typography>
          <form className={classes.form} noValidate>
            {show ? (
              <Alert severity={type}>
                <AlertTitle>{type}</AlertTitle>
                {text}
              </Alert>
            ) : (
              ""
            )}
            {isSignIn ? (
              ""
            ) : (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="You`r name"
                name="name"
                autoComplete="name"
                autoFocus
                inputRef={nameRef}
              />
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passRef}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={authMe}
            >
              {isSignIn ? "Sign In" : "Sign up"}
            </Button>
            <Grid container>
              <Grid item>
                <Button onClick={changeAuthType} className={classes.changeAuth}>
                  {isSignIn
                    ? "Don`t have account? Sign up!"
                    : "Have an account? Sign in!"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
