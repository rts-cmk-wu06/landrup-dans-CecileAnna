import Btn from "./Btn";

import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "../apis/axios";

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
        setErrMsg("Ingen server respons");
      } else if (err.response?.status === 400) {
        setErrMsg("Mangler brugernavn eller kodeord");
      } else if (err.response?.status === 401) {
        setErrMsg("Uautoriseret. Måske forkert kode eller brugernavn?");
      } else {
        setErrMsg("Login fejlede");
      }
      errRef.current.focus();
    }
  };

  // const handlePwdOnChange = (e) => {
  //   let value;

  //   if (e.target.value >= 4) {
  //     value = e.target.value;
  //     setErrMsg("");
  //   } else {
  //     value = setErrMsg("Dit kodeord skal være mindst 4 tegn");
  //   }

  //   setPwd(value);
  // };

  return (
    <>
      {/* <div className="login--grey-box-decoration"></div> */}
      <section>
        <h3
          ref={errRef}
          className="Heading5 login--err-msg"
          aria-live="assertive"
          style={
            errMsg
              ? { display: "block", color: "darkred" }
              : { display: "none" }
          }
        >
          {errMsg}
        </h3>

        <form onSubmit={handleSubmit} className="login--form">
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
