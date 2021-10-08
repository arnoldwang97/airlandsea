import { useStore } from "react-context-hook";
import { setUserProperties } from "@firebase/analytics";

import { getCardInfo, getTheaterColor } from "../utils/utils";
import Facedown from "./Facedown";

export default function Card({ id, facedown = false, opposite, onClick }) {
  const [selectedCardID] = useStore("selectedCardID", null);

  let cardInfo = getCardInfo(id);
  if (cardInfo == null) {
    return null;
  }

  let color = facedown ? "#424554" : getTheaterColor(cardInfo.theater);

  return (
    <div
      style={{
        minHeight: 150,
        width: 100,
        backgroundColor: "#fff",
        textAlign: "center",
        border: "6px solid " + color,
        borderRadius: 4,
        display: "flex",
        padding: 2,
        ...{
          outline: selectedCardID === id ? "4px solid #e4da7a" : "",
          flexDirection: opposite ? "column-reverse" : "column",
        },
      }}
      onClick={onClick}
    >
      {facedown ? (
        <div>2</div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingLeft: 4,
              paddingRight: 4,
              fontSize: 16,
            }}
          >
            <div style={{ fontWeight: "bold" }}>{cardInfo.value}</div>
            {cardInfo.name}
          </div>
          <div style={{ height: 40 }} />
          <div style={{ fontSize: 12 }}>{cardInfo.description}</div>
        </>
      )}
    </div>
  );
}
