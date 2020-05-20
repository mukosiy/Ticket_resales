import { useState, useRef } from "react";
import Router from "next/router";
import Form from "../components/form";

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [mess, setMess] = useState(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const nameRef = useRef(null);
  const [alertText, setAlertText] = useState({
    text: null,
    type: null,
    show: false,
  });
  const authMe = async (e) => {
    e.preventDefault();
    let body;

    if (!isSignIn) {
      body = {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
      };

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = res.json();
      console.log(json);
      if (res.status === 201) {
        setAlertText({ text: json.message, type: "success", show: true });
        setTimeout(() => {
          Router.replace(`/`);
          setAlertText({ text: null, type: null, show: false });
        }, 2000);
      } else {
        setAlertText({ text: json.message, type: "error", show: true });
        setTimeout(() => {
          setAlertText({ text: null, type: null, show: false });
        }, 2000);
      }
    } else {
      body = {
        email: emailRef.current.value,
        password: passRef.current.value,
      };

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (res.status === 201) {
        setAlertText({ text: json.message, type: "success", show: true });
        setTimeout(() => {
          Router.replace(`/person/${json.userId}`);
          setAlertText({ text: null, type: null, show: false });
        }, 2000);
      } else {
        setAlertText({ text: json.message, type: "error", show: true });
        setTimeout(() => {
          setAlertText({ text: null, type: null, show: false });
        }, 2000);
      }
    }
  };

  const changeAuthType = () => {
    setIsSignIn(!isSignIn);
    setErrorMsg("");
    setMess("");
  };

  return (
    <Form
      isSignIn={isSignIn}
      nameRef={nameRef}
      emailRef={emailRef}
      passRef={passRef}
      authMe={authMe}
      changeAuthType={changeAuthType}
      show={alertText.show}
      text={alertText.text}
      type={alertText.type}
    />
  );
}
