import React, { useContext, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../bind-routes";
import { LoginContext } from "../context/LoginContext";

export default function LoginPage() {
  const { isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) {
      navigate(RoutePaths.home);
    }
  }, []);
  return <>{!isLoggedIn() && <LoginForm />}</>;
}
