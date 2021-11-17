import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "react-context-hook";
import "../css/Screen.css";

import { getRoomData, updateRoomField, startGame } from "../utils/db";

import Game from "../components/Game";

export default function Room() {
  let { id } = useParams();
  const [roomData, setRoomData] = useStore("room", null);
  const [playerID] = useStore("id", null);
  const [, setRoomID] = useStore("roomID", null);

  useEffect(() => {
    getRoomData(id, (data) => {
      setRoomData(data);
      setRoomID(id);
    });
  }, [id]);

  useEffect(() => {
    if (playerID == null || roomData == null) {
      return;
    }
    if (
      roomData?.players?.includes(playerID) ||
      roomData?.players?.length >= 2
    ) {
      return;
    }
    updateRoomField(
      "players",
      (roomData?.players ?? []).concat([playerID]),
      id
    );
  }, [playerID, roomData]);

  if (roomData == null) {
    return <div />;
  }

  if (roomData.isPlaying) {
    return <Game id={id} />;
  }

  const player1 = roomData.owner;
  const player2 = roomData.players?.filter((id) => id !== player1)?.[0];

  return (
    <div class="background1">
      <div class="background2">
        <div class="d2">
          {"Player 1 is in the waiting room"}

          {player2 != null ? (
            <div>{"Player 2 is in the waiting room"}</div>
          ) : null}
        </div>

        {playerID === roomData.owner ? (
          <div>
            <button
              class="b1"
              onClick={() => startGame(id, roomData.players)}
              disabled={player1 == null || player2 == null}
            >
              Start Game
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
