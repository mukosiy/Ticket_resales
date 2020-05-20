import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
  },
  loginLink: {
    marginRight: theme.spacing(2),
    //display: "flex",
  },
  title: {
    flexGrow: 1,
    fontFamily: "Montserrat",
    textTransform: "uppercase",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.colors.white,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  icons: {},
  separator: {
    marginRight: theme.spacing(2),
  },
}));
const Nav = ({ id, auth }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <a className={classes.link}>Tickets resales</a>
            </Link>
          </Typography>

          {auth ? (
            <>
              <Link href="/person/[id]" as={`/person/${id}`}>
                <a className={classes.link}>
                  <AccountCircleIcon
                    fontSize={"large"}
                    className={classes.icons}
                  />
                </a>
              </Link>
            </>
          ) : (
            <Link href="/auth">
              <a className={classes.link}>
                <AccountCircleIcon
                  fontSize={"large"}
                  className={classes.icons}
                />
              </a>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
