import { useStore } from "react-context-hook";

import Card from "./Card";
import Facedown from "./Facedown";

export default function Hand({ cardIDs, hidden = true }) {
  const [selectedCardID, setSelectedCardID] = useStore("selectedCardID", null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: 4,
        alignItems: "flex-end",
      }}
    >
      {cardIDs?.map((cardID) => (
        <div style={{ marginLeft: 6 }}>
          <Card
            inHand={true}
            isYours={!hidden}
            facedown={hidden}
            id={cardID}
            onClick={() => {
              if (selectedCardID === cardID) {
                setSelectedCardID(null);
              } else {
                setSelectedCardID(cardID);
              }
            }}
          />
        </div>
      ))}
    </div>
  );
}
