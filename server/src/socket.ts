import { Server, Socket } from "socket.io";
import logger from "./utils/logger";
const EVENTS = {
  connection: "connection",
};
function socket({ io }: { io: Server }) {
  logger.info(`Sockets enabled`);
  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);
  });
  /* 
   ห้องเดียวกันเลือกใช้ socket
   ต่างห้องกันเลือกใช้ io
  */
}

export default socket;
