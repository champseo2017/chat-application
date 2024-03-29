import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import logger from "./utils/logger";
const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
  },
};
const rooms: Record<string, { name: string }> = {};
function socket({ io }: { io: Server }) {
  logger.info(`Sockets enabled`);
  io.on(EVENTS.connection, (socket: Socket) => {
    logger.info(`User connected ${socket.id}`);
    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      console.log("roomName", { roomName });
      // create a roomId
      const roomId = nanoid();
      // add a new room to the rooms object
      rooms[roomId] = {
        name: roomName,
      };

      socket.join(roomId);

      // broadcast an event saying there is a new room
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

      // emit back to the room creator with all the rooms
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
      // emit event back the room creator saying they have joined a room
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId)
    });
  });

  /* 
   ห้องเดียวกันเลือกใช้ socket
   ต่างห้องกันเลือกใช้ io
  */
}

export default socket;
