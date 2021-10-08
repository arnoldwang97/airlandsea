import { useEffect } from "react";
import { useStore } from "react-context-hook";

import { getGameData, playCardToTheater } from "../utils/db";
import Facedown from "./Facedown";
import Card from "./Card";
import Board from "./Board";

export default function Game(props) {
  const { id } = props;
  const [gameData, setGameData] = useStore("game", null);
  const [playerID] = useStore("id", null);
  const [selectedCardID, setSelectedCardID] = useStore("selectedCardID", null);
  const [nextFacedown, setNextFacedown] = useStore("nextFacedown", false);

  useEffect(() => {
    getGameData(id, (data) => {
      setGameData(data);
    });
  }, [id]);

  if (gameData == null || gameData.order == null) {
    return null;
  }

  let playerHand = [];
  let otherPlayerHand = [];
  if (gameData.player1 === playerID) {
    playerHand = gameData.hands.player1;
    otherPlayerHand = gameData.hands.player2;
  } else if (gameData.player2 === playerID) {
    playerHand = gameData.hands.player2;
    otherPlayerHand = gameData.hands.player1;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        {otherPlayerHand?.map((_) => (
          <Facedown />
        ))}
      </div>
      <Board id={id} gameData={gameData} />
      <input
        type="checkbox"
        id="nextFacedown"
        name="nextFacedown"
        onChange={(event) => setNextFacedown(event.target.checked)}
      />
      <label for="nextFacedown">Enable Facedown</label>

      <div style={{ display: "flex", flexDirection: "row" }}>
        {playerHand?.map((cardID) => (
          <Card
            id={cardID}
            onClick={() => {
              if (selectedCardID === cardID) {
                setSelectedCardID(null);
              } else {
                setSelectedCardID(cardID);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}
