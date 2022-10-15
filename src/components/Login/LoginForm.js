import classes from "./LoginForm.module.css";
import { useContext, useRef, useState } from "react";
import Card from "../UI/Card";
import useInput from "../../hooks/use-input";
import validator from "validator";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

// import { AuthContext } from "../../store/auth-context";

const LoginForm = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setLogin] = useState(true);
  const emailRef = useRef();
  const pwdRef = useRef();
  const [unAuth, setUnAuth] = useState(null);

  const emailValidation = (enteredEmail) => {
    if (validator.isEmail(enteredEmail)) {
      return true;
    }
    return false;
  };

  const pwdValidation = (enteredPwd) => {
    if (
      validator.isStrongPassword(enteredPwd, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return true;
    }
    return false;
  };

  let {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(emailValidation);

  let {
    value: enteredPwd,
    isValid: enteredPwdIsValid,
    hasError: pwdInputHasError,
    valueChangeHandler: pwdChangeHandler,
    inputBlurHandler: pwdBlurHandler,
  } = useInput(pwdValidation);

  let formIsValid = false;

  if (enteredPwdIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const sumbitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPwd = pwdRef.current.value;
    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbTQjJS0HFYDbVLA2UKto61QupSwee3jI";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbTQjJS0HFYDbVLA2UKto61QupSwee3jI";
    }
    let message = "";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPwd,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            message = `Please enter a valid email and password. If you are already signed in, Click Login with existing account.`;
            setUnAuth(message);
            return;
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.localId, data.idToken, expirationTime.toISOString()); // Login
        navigate("/weather");
      });

    if (message.trim().length > 0) {
      alert(message);
      return;
    }
  };

  const switchAuthModeHandler = () => {
    setLogin(!isLogin);
  };

  return (
    <div className={classes.result}>
      <Card>
        <form onSubmit={sumbitHandler}>
          <div className={classes.auth}>
            <h1 className="heading">{isLogin ? "Login" : "SignUp"}</h1>
            <label htmlFor="email">Email</label>
            <input
              className={classes.email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              value={enteredEmail}
              type="email"
              id="email"
              ref={emailRef}
              required
            />
            {emailInputHasError && (
              <p className="error-text">Please enter valid email.</p>
            )}
            <label htmlFor="password">Password</label>
            <input
              ref={pwdRef}
              onChange={pwdChangeHandler}
              onBlur={pwdBlurHandler}
              value={enteredPwd}
              type="password"
              id="password"
              required
            />
            {pwdInputHasError && (
              <p className="error-text">Please enter a valid password.</p>
            )}
          </div>
          <div className={classes.actions}>
            <button disabled={!formIsValid}>
              {isLogin ? "Login" : "SignUp"}
            </button>

            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? (
                <span>Create new account</span>
              ) : (
                <span>Login with existing account</span>
              )}
              {unAuth && <p className="error-text">{unAuth}</p>}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginForm;
