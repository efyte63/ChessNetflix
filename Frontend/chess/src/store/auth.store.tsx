import { create } from "zustand";
import { axiosInstance } from "../config/axios";
import { io, Socket } from "socket.io-client";

type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
};

type Store = {
  user: User | null;
  socket: Socket | null;
  register: (username: string, email: string, password: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  socketConnect: () => void;
  socketDisconnect: () => void;
};

export const userauth = create<Store>((set, get) => ({
  user: null,
  socket: null,

  register: async (username, email, password) => {
    try {
      await axiosInstance.post("/auth/v1/register", { username, email, password });
    } catch (error) {
      console.log(error);
    }
  },

  login: async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/v1/login", { email, password });
      if(res)
      {
      set({ user: res.data });
      get().socketConnect();
      }
      
    } catch (error) {
      console.log(error);
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/v1/logout");
      console.log(res.data.msg);
      get().socketDisconnect();
      set({ user: null });
    } catch (error) {
      console.log(error);
    }
  },

  socketConnect: () => {
    const { user, socket } = get();
    if (!user || socket !== null) return; // ✅ prevent duplicate

    const newSocket = io("http://100.48.100.255:3000", {
      query: { userid: user._id },
      transports: ["websocket"], // ✅ single transport, no polling
      autoConnect: true,
    });

    newSocket.on("connect", () => {
      console.log("✅ socket connected:", newSocket.id);
    });

    set({ socket: newSocket });
    console.log("🔌 socket instance created");
  },

  socketDisconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
      console.log("🔌 socket disconnected");
    }
  },
}));