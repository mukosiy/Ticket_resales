import Tickets from "../components/tickets";
import { Container, Typography } from "@material-ui/core";
import sqlite from "sqlite";
import Link from "next/link";
import { useState, useRef } from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";

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
const Home = ({ tickets, auth, id }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [ticketId, setTicketId] = useState(null);
  const [alertText, setAlertText] = useState({
    text: null,
    type: null,
    show: false,
  });
  const emailRef = useRef(null);
  const nameRef = useRef(null);

  const handleOpen = (e) => {
    setTicketId(e.target.parentNode.dataset.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSend = async (e) => {
    const body = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      ticketId,
    };
    console.log(body);
    const resp = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(resp.status);
    if (resp.status === 200) {
      setAlertText({
        text: "Check you`r email, at least 5 minutes to send",
        type: "success",
        show: true,
      });
      console.log(alertText);
      setOpen(false);
      setTimeout(() => {
        setAlertText({ text: null, type: null, show: false });
      }, 3000);
    } else {
      setAlertText({ text: "Something get wrong!", type: "error", show: true });
      setOpen(true);
      setTimeout(() => {
        setAlertText({ text: null, type: null, show: false });
      }, 3000);
    }
  };
  return (
    <>
      <Container>
        <Typography component="h1" variant="h5">
          All tickets
        </Typography>

        {alertText.show ? (
          <Alert severity={alertText.type}>
            <AlertTitle>{alertText.type}</AlertTitle>
            {alertText.text}
          </Alert>
        ) : (
          ""
        )}
        {tickets.length !== 0 ? (
          <Tickets ticketsList={tickets} handleOpen={handleOpen} />
        ) : (
          <>
            <Typography component="h1" variant="h5">
              Now don`t have any tickets
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              If you want to add{" "}
              {auth ? (
                <Link href={`/person/${id}`}>
                  <a>let`s go to you'r profile</a>
                </Link>
              ) : (
                <Link href="/auth">
                  <a>authorize please</a>
                </Link>
              )}
            </Typography>
          </>
        )}
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Set you`r name and email</h2>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            name="email"
            label="You`r email"
            type="email"
            inputRef={emailRef}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            name="name"
            label="You`r name"
            type="name"
            inputRef={nameRef}
          />
          <Button variant="contained" color="primary" onClick={handleSend}>
            Send
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Home;

export const getServerSideProps = async (ctx) => {
  const db = await sqlite.open("./mydb.sqlite");
  const tickets = await db.all(`select * from ticket`);
  return { props: { tickets } };
};
