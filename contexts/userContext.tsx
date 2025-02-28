import { baseUrl } from "@/contants/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { jwtDecode } from "jwt-decode";

interface User {
  _id: string;
  username: string;
  email: string;
  profileUrl: string;
  createdAt: string;
  updatedAt: string;
  following: string[];
  followers: string[];
  __v: 0;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  id: string | null;
  setUser: (value: User) => void;
}

type JwtPayload = {
  id: string;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string | null>(null);

  console.log({ user });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode<JwtPayload>(token);
          setId(decodedToken.id); // This happens asynchronously
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/api/user/get-user-by-id/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (id) getUser();
  }, [id]);

  return (
    <UserContext.Provider value={{ user, loading, id, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
