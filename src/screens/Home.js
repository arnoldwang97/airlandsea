import { useState } from "react";
import { Redirect } from "react-router-dom";
import { createRoom } from "../utils/db";
import "../css/Screen.css";

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
  return (
    <div class="background1">
      <div class="background2">
        <div>
          <button class="b1" onClick={createAndGoToRoom}>
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}
