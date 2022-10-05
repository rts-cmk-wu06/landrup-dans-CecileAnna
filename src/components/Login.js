import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "../apis/axios";
import Heading5 from "./subcomponents/texts/Heading5";
import Btn from "./Btn";
import { useNavigate } from "react-router-dom";

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
  const auth = useA.auth;

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

      // console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const token = response?.data?.token;
      const userId = response?.data?.userId;
      const role = response?.data?.role;

      setAuth({
        user,
        pwd,
        token,
        userId,
        role,
      });

      console.log(auth && auth);

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
        <Heading5
          ref={errRef}
          ariaLive="assertive"
          styles={errMsg ? "login--err-msg-block" : "login--err-msg-none"}
          text={errMsg}
        />

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
