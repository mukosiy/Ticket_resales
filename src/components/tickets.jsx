import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: theme.spacing(2, 0, 2, 0),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  artist: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 450,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Tickets = ({ ticketsList, handleOpen }) => {
  const classes = useStyles();
  const listItems = ticketsList.map((ticket) => (
    <React.Fragment key={ticket.id}>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h4" component="h5">
            {ticket.title}
          </Typography>
          <Typography variant="h6" component="h1">
            {ticket.descr}
          </Typography>
          <Typography
            className={classes.artist}
            color="textSecondary"
            gutterBottom
          >
            Artist: {ticket.artist}
          </Typography>

          <Typography color="textSecondary" gutterBottom>
            Place: {ticket.place}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleOpen}
            data-id={ticket.id}
          >
            Buy
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  ));
  return <>{listItems}</>;
};

export default Tickets;
