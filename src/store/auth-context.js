import { createContext, useCallback, useState } from "react";

const AuthContext = createContext({
  token: "",
  localId: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const curTime = new Date().getTime();
  const adjExpirrationTime = new Date(expirationTime).getTime();

  return adjExpirrationTime - curTime;
};

const retieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");

  const storedLocalId = localStorage.getItem("localId");

  const storedExpirationTime = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("localId");
    return null;
  }

  return {
    token: storedToken,
    remainingTime: remainingTime,
    localId: storedLocalId
  };
};

export const AuthContextProvider = (props) => {
  const initialTokenData = retieveStoredToken(); // To get if there is already stored token and expiration time in localStorage
  let initialToken;
  let initialLocalId;
  if (initialTokenData) {
    initialToken = initialTokenData.token;
    initialLocalId = initialTokenData.localId;
  }

  const [token, setToken] = useState(initialToken);
  const [LocalId, setLocalId] = useState(initialLocalId);

  const userIsLoggedIn = !!token;

  const loginHandler = (localId, token, expirationTime) => {
    setToken(token);
    setLocalId(localId);

    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem('localId',localId);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("localId");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const contextValue = {
    localId: LocalId,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
