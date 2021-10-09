import { useStore } from "react-context-hook";

import { Cards } from "../utils/cards";
import { playCardToTheater, returnCardToHand, flipCard } from "../utils/db";
import { getPlayer, getTheaterColor, getTheaterName } from "../utils/utils";
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
          style={{ flex: 1 }}
        >
          <TheaterSide
            opposite={true}
            player={otherPlayer}
            theater={gameData?.theaters?.[theater]}
          />
          <div
            style={{
              display: "flex",
              height: 150,
              backgroundColor: getTheaterColor(theater),
              justifyContent: "center",
              alignItems: "center",
              marginTop: 8,
              marginBottom: 8,
              fontSize: 70,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            {getTheaterName(theater)}
          </div>
          <TheaterSide
            player={yourPlayer}
            isYours={yourPlayer === getPlayer(playerID)}
            theater={gameData?.theaters?.[theater]}
          />
        </div>
      ))}
    </div>
  );
}

function TheaterSide({ opposite, player, theater, isYours }) {
  const [specialBoardAction] = useStore("specialBoardAction", "redeploy");

  return (
    <div
      style={{
        alignItems: "center",
        position: "relative",
        height: "30vh",
        display: "flex",
        flexDirection: opposite ? "column-reverse" : "column",
      }}
    >
      {theater?.[player]?.map((card, index) => (
        <div
          style={{
            zIndex: index,
            position: "absolute",
            [opposite ? "bottom" : "top"]: index * 32,
          }}
        >
          <Card
            id={card.id}
            isYours={isYours}
            opposite={opposite}
            facedown={card.facedown}
            onClick={() => {
              switch (specialBoardAction) {
                case "redeploy":
                  returnCardToHand(card.id);
                  break;
                case "flip uncover":
                  flipCard(card.id);
                  break;
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
