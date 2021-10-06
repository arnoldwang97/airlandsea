import { useState } from "react";
import { Redirect } from "react-router-dom";
import { createRoom } from "../utils/db";

export default function Home() {
  const [roomID, setRoomID] = useState(null);

  function createAndGoToRoom() {
    createRoom((newRoomID) => {
      setRoomID(newRoomID);
    });
  }

  if (roomID != null) {
    return <Redirect to={"/rooms/" + roomID} />;
  }
  return <button onClick={createAndGoToRoom}>Create Room</button>;
}
