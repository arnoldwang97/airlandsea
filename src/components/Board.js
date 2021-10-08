import { useStore } from "react-context-hook";

import { Cards } from "../utils/cards";
import { playCardToTheater } from "../utils/db";
import { getPlayer } from "../utils/utils";
import Card from "./Card";

export default function Board({ id, gameData }) {
  const [playerID] = useStore("id", null);
  const [, setSelectedCardID] = useStore("selectedCardID", null);

  const yourPlayer = getPlayer(playerID) ?? "player1";
  const otherPlayer = yourPlayer === "player1" ? "player2" : "player1";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {gameData.order.split("/").map((theater) => (
        <div
          onClick={() => {
            playCardToTheater(id, theater);
            setSelectedCardID(null);
          }}
        >
          <TheaterSide
            opposite={true}
            player={otherPlayer}
            theater={gameData?.theaters?.[theater]}
          />
          <div
            style={{
              width: 300,
              height: 150,
              border: "3px solid gray",
              textAlign: "center",
            }}
          >
            {theater}
          </div>
          <TheaterSide
            player={yourPlayer}
            theater={gameData?.theaters?.[theater]}
          />
        </div>
      ))}
    </div>
  );
}

function TheaterSide({ opposite, player, theater }) {
  const [specialBoardAction] = useStore("specialBoardAction", "redeploy");
  return (
    <div
      style={{
        height: "30vh",
        width: 300,
        display: "flex",
        flexDirection: opposite ? "column-reverse" : "column",
      }}
    >
      {theater?.[player]?.map((card) => (
        <Card
          id={card.id}
          facedown={card.facedown}
          onClick={() => {
            switch (specialBoardAction) {
              case "redeploy":
                returnCardToHand(card.id);
            }
          }}
        />
      ))}
    </div>
  );
}
