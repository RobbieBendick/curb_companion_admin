import React, { Dispatch, useState } from "react";
import IUser from "../shared/interfaces/user";

export enum Tokens {
  ACCESS_TOKEN = "access-token",
  REFRESH_TOKEN = "refresh-token",
}

export interface IUserContext {
  user: Partial<IUser>;
  updateUser: Dispatch<Partial<IUser>>;
}

export const UserContext = React.createContext<IUserContext>({
  user: {},
  updateUser: () => null,
});

const UserContextProvider: React.FC<any> = ({
  children,
}: {
  children: any;
}) => {
  const [user, updateUser] = useState<Partial<IUser>>(
    JSON.parse(localStorage.getItem("user") || "{}"),
  );

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
