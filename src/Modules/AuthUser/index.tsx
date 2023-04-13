import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {User} from "../../App/Types";
import Cookies from "js-cookie";
import api from "./Api";

interface AuthContext {
  isLoaded: boolean
  currentUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
  tokenData: string | null
  setToken:  (tokenData: string) => void
  logOut: () => void
}
const AuthUserContext = createContext<AuthContext>({
  isLoaded: false,
  currentUser: null,
  setCurrentUser: () => {},
  logOut: () => {},
  tokenData: null,
  setToken: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode
}
export const AuthProvider = ({children}: AuthProviderProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<null | User>(null)
  const [tokenData, setTokenData] = useState<string | null>(null)
  const setToken = useCallback((tokenData: string | null) => {
    setTokenData(tokenData);
    if (tokenData) {
      Cookies.set("auth-token", tokenData);
    } else {
      Cookies.remove("auth-token");
    }
  }, []);

  const logOut = useCallback(() => {
    setCurrentUser(null);
    setToken(null);
  }, [setToken]);

  const loadData = useCallback(async () => {
    const tokenData = Cookies.get("auth-token");
    setTokenData(tokenData || null);
    try {
      if(tokenData) {
        const {data} = await api.auth.getProfile();
        setCurrentUser(data)
      }
    } catch {
      setToken(null)
    } finally {
      setIsLoaded(true)
    }
  }, [setToken])

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValues = useMemo(
    () => ({
      isLoaded,
      currentUser,
      setCurrentUser,
      tokenData,
      setToken,
      logOut
    }), [isLoaded, currentUser, tokenData, setToken, logOut]
  )
  return (
    <AuthUserContext.Provider value={contextValues}>
      {children}
    </AuthUserContext.Provider>
  )

}

export const useAuth = () => useContext(AuthUserContext)

