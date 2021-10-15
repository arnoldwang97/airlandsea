import { useEffect } from "react";
import { useStore } from "react-context-hook";

import {
  getGameData,
  nextRound,
  playCardToTheater,
  restartGame,
} from "../utils/db";
import { getPlayer, getPlayerScore, getOtherPlayerID } from "../utils/utils";

import Hand from "./Hand";
import Board from "./Board";
import Commanders from "./Commanders";

export default function Game(props) {
  const { id } = props;
  const [gameData, setGameData] = useStore("game", null);
  const [playerID] = useStore("id", null);
  const [selectedCardID, setSelectedCardID] = useStore("selectedCardID", null);
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
  let showPlayerHand = false;
  if (gameData.player2 === playerID) {
    playerHand = gameData.hands.player2;
    otherPlayerHand = gameData.hands.player1;
    showPlayerHand = true;
  } else {
    playerHand = gameData.hands.player1;
    otherPlayerHand = gameData.hands.player2;
    showPlayerHand = gameData.player1 === playerID;
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
        <div>Score:{getPlayerScore(getOtherPlayerID(playerID))}</div>
        <Commanders
          currentPlayer={getPlayer(playerID)}
          otherPlayer={
            getPlayer(playerID) === "player2" ? "player1" : "player2"
          }
        />
        <div>
          {gameData.player1 === playerID || gameData.player2 === playerID ? (
            <div style={{ marginBottom: 20 }}>
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
            </div>
          ) : null}
          <div>Score:{getPlayerScore(playerID)}</div>
          <Hand cardIDs={playerHand} hidden={!showPlayerHand} />
        </div>
      </div>
      <Board id={id} gameData={gameData} />
    </div>
  );
}
