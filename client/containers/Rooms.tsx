import { useRef } from "react";
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context";

function RoomsContainer() {
  const { socket, roomId, rooms } = useSockets();
  const newRoomRef = useRef(null);
  function handleCreateRoom() {
    // get the room name
    const roomName = newRoomRef.current.value || "";
    if (!String(roomName).trim()) return;
    // emit room create event
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });
    // set room name input to empty string
    newRoomRef.current.value = "";
  }
  return (
    <nav>
      <div>
        <input ref={newRoomRef} type="text" placeholder="Room name" />
        <button onClick={handleCreateRoom}>CREATE ROOM</button>
      </div>
    </nav>
  );
}

export default RoomsContainer;
