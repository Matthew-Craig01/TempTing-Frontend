import Cookies from "js-cookie";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction,
} from "react";

/* type User = {
 *   id: string;
 *   name: string;
 * };
 *  */
export type User = string;

const UserContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
  signout: () => void;
  signin: (user: User, sessionKey: string) => void;
  sessionKey: () => string | undefined;
}>({
  user: null,
  setUser: () => null,
  signout: () => null,
  signin: () => null,
  sessionKey: () => undefined,
});

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const storageKey = "user";
  const [user, setUser] = useState<User | null>(
    () => (localStorage.getItem(storageKey) as User) || null,
  );

  const signout = () => {
    localStorage.removeItem(storageKey);
    Cookies.remove("sessionKey");
    setUser(null);
  };

  const saveUser = (user: User) => {
    localStorage.setItem(storageKey, user);
    setUser(user);
  };

  const value = {
    user,
    setUser: (user: User) => {
      saveUser(user);
    },
    signout,
    signin: (user: User, sessionKey: string) => {
      signout();
      Cookies.set("sessionKey", sessionKey);
      saveUser(user);
    },
    sessionKey: () => {
      return Cookies.get("sessionKey");
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
