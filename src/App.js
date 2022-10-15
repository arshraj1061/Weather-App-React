import "./App.css";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Weather from "./components/Weather/Weather";
import Help from "./components/Help/Help";
import About from "./components/About/About";
import Layout from "./components/layout/Layout";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/auth" element={<Login />} />
        {/* <Route path="/" element= {<Navigate to="/weather" /> } /> */}

        {authCtx.isLoggedIn && (
          <Route path="/auth" element={<Navigate to="/weather" />} />
        )}

        {!authCtx.isLoggedIn && (
          <Route path="/weather" element={<Navigate to="/auth" />} />
        )}

        {authCtx.isLoggedIn && (
          <Route path="/auth" element={<Navigate to="/weather" />} />
        )}

        <Route path="/weather" element={<Weather />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        {/* <Route path="/logout" replace element={authCtx.logout() && <Navigate push to="/weather" />} /> */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Layout>
  );
}

export default App;
