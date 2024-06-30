"use client";
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { IRootState } from "@/redux/rootReducer";

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }
  return context;
};

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    if (user) {
      const newSocket = io(`${process.env.NEXT_PUBLIC_API_URL}`) as Socket;

      setSocket(newSocket);

      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
