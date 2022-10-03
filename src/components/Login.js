import { useRef, useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "../apis/axios";

const LOGIN_URL = "auth/token";

const Login = () => {
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

      setAuth({
        user,
        pwd,
        token,
        userId,
      });

      console.log(auth && auth);

      setUser("");
      setPwd("");
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
      <main className="App-main">
        <section>
          <p
            ref={errRef}
            aria-live="assertive"
            style={errMsg ? { display: "block" } : { display: "none" }}
          >
            {errMsg}
          </p>

          <h1>Log ind</h1>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexFlow: "column nowrap", gap: "1rem" }}
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
            />

            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              placeholder="adgangskode"
            />

            <button>Sign in</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
