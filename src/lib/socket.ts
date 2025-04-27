import { io } from "socket.io-client";

import { API_URL } from "@/lib/constants";

export const socket = io(API_URL, {
  autoConnect: true,
  transports: ["websocket"],
});
