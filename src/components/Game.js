import { useEffect } from "react";
import { useStore } from "react-context-hook";

import {
  getGameData,
  nextRound,
  playCardToTheater,
  restartGame,
} from "../utils/db";
import { getPlayer } from "../utils/utils";

import Hand from "./Hand";
import Board from "./Board";
import Commanders from "./Commanders";

export default function Game(props) {
  const { id } = props;
  const [gameData, setGameData] = useStore("game", null);
  const [playerID] = useStore("id", null);
  const [selectedCardID, setSelectedCardID] = useStore("selectedCardID", null);
  const [nextFacedown, setNextFacedown] = useStore("nextFacedown", false);
  const [specialBoardAction, setSpecialBoardAction] = useStore(
    "specialBoardAction",
    "redeploy"
  );

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
        flexDirection: "row",
        height: "100vh",
      }}
    >
      <div
        style={{
          minWidth: "40vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: "1px solid #d1d1d1",
        }}
      >
        <Hand cardIDs={otherPlayerHand} />
        <Commanders
          currentPlayer={getPlayer(playerID)}
          otherPlayer={getPlayer(playerID) == "player1" ? "player2" : "player1"}
        />
        <div>
          <input
            type="checkbox"
            id="nextFacedown"
            name="nextFacedown"
            onChange={(event) => setNextFacedown(event.target.checked)}
          />
          <label for="nextFacedown">Enable Facedown</label>
          <select
            name="actionBox"
            onChange={(event) => {
              switch (event.target.value) {
                case "Return Card To Hand":
                  setSpecialBoardAction("redeploy");
                  break;
                case "Flip Uncovered Card":
                  setSpecialBoardAction("flip uncover");
                  break;
              }
            }}
          >
            <option>Return Card To Hand</option>
            <option>Flip Uncovered Card</option>
          </select>
          <button onClick={restartGame}>End Game</button>
          <button onClick={() => nextRound(id, playerID)}>Surrender</button>
          <Hand cardIDs={playerHand} hidden={false} />
        </div>
      </div>
      <Board id={id} gameData={gameData} />
    </div>
  );
}
