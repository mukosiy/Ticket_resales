import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: theme.spacing(4),
    borderRadius: "10px",
    width: "400px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  image: {
    width: "100vw",
    height: "100vh",
    position: "absolute",
    zIndex: -1,
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
}));

export default function Profile({ name, auth, id }) {
  const classes = useStyles();

  return (
    <>
      <Grid item className={classes.image} />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Hello {name}
          </Typography>
          <br />
          <Typography component="h1" variant="h5">
            If you want add tickets requier all fields
          </Typography>
          <form
            className={classes.form}
            action="/api/ticket/upload"
            encType="multipart/form-data"
            method="post"
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="title"
              required
              placeholder="title"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="text"
              name="artist"
              required
              placeholder="artist"
            />

            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              required
              type="text"
              name="descr"
              required
              placeholder="descr"
            />
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              required
              type="text"
              name="place"
              required
              placeholder="place"
            />
            <Input
              required
              type="file"
              name="multipleFiles"
              className={classes.input}
            />
            <Button type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
