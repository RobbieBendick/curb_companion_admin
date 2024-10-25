import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tokens } from "../models/Tokens";
import { LoginRequest } from "../models/Requests";
import { RoutePaths } from "../bind-routes";
import IUser from "../shared/interfaces/user";
import { UserContext } from "./UserContext";
import { authorize } from "../api/Authorize";
import { loginBackend } from "../api/Authenticate";

export interface ILoginContext {
  error: string;
  loggedIn: () => Promise<boolean>;
  isLoggedIn: () => boolean;
  login: (loginRequest: LoginRequest) => Promise<boolean>;
  logout: () => void;
}

export const LoginContext = React.createContext<ILoginContext>({
  error: "",
  loggedIn: async () => false,
  isLoggedIn: () => false,
  login: async () => false,
  logout: () => null,
});

const LoginContextProvider: React.FC<any> = ({
  children,
}: {
  children: any;
}) => {
  const { user, updateUser } = useContext(UserContext);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if ((import.meta as any).env.VITE_IGNORE_LOGIN === "false") {
      loggedIn().then((val: boolean) => {
        if (!val) {
          val ?? navigate(RoutePaths.login);
        }
      });
    }
  }, []);

  const isLoggedIn = (): boolean => {
    return (
      Object.keys(user).length !== 0 ||
      (import.meta as any).env.VITE_IGNORE_LOGIN === "true"
    );
  };

  const loggedIn = async (): Promise<boolean> => {
    const response = await authorize();

    if (response.status >= 200 && response.status < 300) {
      const user = response.data.data as IUser;
      localStorage.setItem("user", JSON.stringify(user));
      setError("");
      updateUser(user);
      return true;
    }
    logout();
    setError("");
    return false;
  };

  const login = async (loginRequest: LoginRequest): Promise<boolean> => {
    const response = await loginBackend(loginRequest);

    if (response.status >= 200 && response.status < 300) {
      localStorage.setItem(
        Tokens.AccessToken,
        response.data.data[Tokens.AccessToken]
      );
      localStorage.setItem(
        Tokens.RefreshToken,
        response.data.data[Tokens.RefreshToken]
      );

      const authorizeResponse = await authorize();
      if (authorizeResponse.status >= 200 && authorizeResponse.status < 300) {
        const user = authorizeResponse.data.data as IUser;
        if (!user.roles.includes("admin")) {
          setError("You are not authorized to access this page.");
          logout();
          return false;
        }
        localStorage.setItem("user", JSON.stringify(user));
        setError("");
        updateUser(user);
        navigate(RoutePaths.home);
        return true;
      }
    }

    setError(response.data.errorMessage);
    logout();
    return false;
  };

  const logout = () => {
    updateUser({});
    localStorage.removeItem("user");
    localStorage.removeItem(Tokens.AccessToken);
    localStorage.removeItem(Tokens.RefreshToken);
    navigate(RoutePaths.login);
  };

  return (
    <LoginContext.Provider
      value={{ error, loggedIn, isLoggedIn, login, logout }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
