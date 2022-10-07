import Btn from "./Btn";

import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "../apis/axios";
import * as yup from 'yup';

let schema = yup.object().shape({
  username: yup.string().required(),
  password: yup
    .string()
    .required("Please provide a valid password")
    .oneOf([yup.ref("password"), null])
    .min(8, "Password needs to be a minimum of 8 characters"),
  createdOn: yup.date().default(function() {
    return new Date();
  }),
});

// // check validity
// schema
//   .isValid({

//   })
//   .then(function (valid) {
//     valid; // => true
//   });

const LOGIN_URL = "auth/token";

const Login = () => {
  let navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const useA = useAuth();
  const setAuth = useA.setAuth;

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response?.data?.token;
      const userId = response?.data?.userId;
      const role = response?.data?.role;
      const login = true;

      setAuth({
        user,
        pwd,
        token,
        userId,
        role,
        login,
      });

      setUser("");
      setPwd("");

      navigate("/activities");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <section>
        <h3
          ref={errRef}
          className="Heading5"
          aria-live="assertive"
          style={
            errMsg
              ? { display: "block", color: "darkred" }
              : { display: "none" }
          }
        >
          {errMsg}
        </h3>

        <form
          onSubmit={handleSubmit}
          // style={{ display: "flex", flexFlow: "column nowrap", gap: "1rem" }}
          className="login--form"
        >
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            placeholder="brugernavn"
            className="login--input"
          />

          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            placeholder="adgangskode"
            className="login--input"
          />

          <Btn text="Log ind" styles="login--btn" />
        </form>
      </section>
    </>
  );
};

export default Login;
