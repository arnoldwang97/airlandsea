import { useStore } from "react-context-hook";

import { Cards } from "../utils/cards";
import { playCardToTheater, returnCardToHand } from "../utils/db";
import { getPlayer, getTheaterColor } from "../utils/utils";
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
              border: "10px solid " + getTheaterColor(theater),
              textAlign: "center",
              marginTop: 8,
              marginBottom: 8,
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
        position: "relative",
        height: "30vh",
        width: 300,
        display: "flex",
        flexDirection: opposite ? "column-reverse" : "column",
      }}
    >
      {theater?.[player]?.map((card, index) => (
        <div
          style={{
            zIndex: index,
            position: "absolute",
            [opposite ? "bottom" : "top"]: index * 30,
          }}
        >
          <Card
            id={card.id}
            opposite={opposite}
            facedown={card.facedown}
            onClick={() => {
              switch (specialBoardAction) {
                case "redeploy":
                  returnCardToHand(card.id);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
