"use client";

import { usePathname, useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Fetch } from "../hooks/apiUtils";
import Loader from "@/app/components/common/Loader";

interface AuthContextProps {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;
  login: (accessToken: string, refreshToken: string, userData: object) => void;
  logout: () => void;
  hasPermission: (tabRoute: any, action: any) => any
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useRouter();
  const pathName = usePathname();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any | null>(null);
  const [tsbs, setTsbs] = useState(null)
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    navigate.prefetch(pathName);
  }, [navigate, pathName]);

  useEffect(() => {
    const fetchUser = async (storedAccessToken: string, storedRefreshToken: string) => {
      try {
        const endpoint = "api/user/get-current-user";
        const response: { success: boolean; data: any; message: string } =
          await Fetch(endpoint, {}, 5000, true, false);

        if (response?.success && response?.data) {
          setUser(response.data);
          setTsbs(response?.data)
          setAccessToken(storedAccessToken);
          setRefreshToken(storedRefreshToken);
          setLoading(false);
          return navigate.replace(pathName);
        } else {
          setLoading(false);
          localStorage.clear();
          return navigate.replace("/auth/login");
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
        localStorage.clear();
        return navigate.replace("/auth/login");
      }
    };

    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    console.log("dddd")
    if (storedAccessToken && storedRefreshToken) {
      fetchUser(storedAccessToken, storedRefreshToken);
    } else {
      setLoading(false);
    }
  }, [navigate, pathName]);

  const login = (accessToken: string, refreshToken: string, userData: any) => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setUser(userData);
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    return navigate.push("/dashboard");
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.clear();
    return navigate.replace("/auth/login");
  };

  const hasPermission = (tabRoute: any, action: any) => {
    return user?.role?.access.some((a: any) =>
      a.tab.route === tabRoute &&
      a.permissions[0].includes(action)
    );
  }


  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, hasPermission }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};