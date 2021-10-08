import { useEffect } from "react";
import { useStore } from "react-context-hook";

import { getGameData, playCardToTheater } from "../utils/db";

import Hand from "./Hand";
import Board from "./Board";

export default function Game(props) {
  const { id } = props;
  const [gameData, setGameData] = useStore("game", null);
  const [playerID] = useStore("id", null);
  const [selectedCardID, setSelectedCardID] = useStore("selectedCardID", null);

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
      <Hand cardIDs={otherPlayerHand} />
      <Board id={id} gameData={gameData} />
      <Hand cardIDs={playerHand} hidden={false} />
      <button onClick={() => {}} />
    </div>
  );
}
