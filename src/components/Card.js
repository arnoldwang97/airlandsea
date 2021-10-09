import { useStore } from "react-context-hook";
import { setUserProperties } from "@firebase/analytics";

import { getCardInfo, getTheaterColor } from "../utils/utils";
import Facedown from "./Facedown";
import "../css/Card.css";

const CARD_HEIGHT = 180;

export default function Card({
  id,
  facedown = false,
  isYours = false,
  opposite,
  onClick,
}) {
  const [selectedCardID] = useStore("selectedCardID", null);

  let cardInfo = getCardInfo(id);
  if (cardInfo == null) {
    return null;
  }

  let color = facedown ? "#616575" : getTheaterColor(cardInfo.theater);

  return (
    <>
      <div
        style={{
          minHeight: CARD_HEIGHT,
          width: 120,
          backgroundColor: "#fff",
          textAlign: "left",
          border: "6px solid " + color,
          borderRadius: 4,
          display: "flex",
          ...{
            outline: selectedCardID === id ? "4px solid #e4da7a" : "",
            flexDirection: opposite ? "column-reverse" : "column",
          },
        }}
        onClick={onClick}
        className="anchor"
      >
        {facedown ? (
          <div
            style={{
              height: CARD_HEIGHT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 50,
              fontWeight: 600,
              backgroundColor: color,
              color: "#fff",
            }}
          >
            2
          </div>
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
                backgroundColor: color,
                color: "#fff",
                [opposite ? "paddingTop" : "paddingBottom"]: 4,
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{cardInfo.value}</div>
              {cardInfo.name}
            </div>
            <div style={{ height: 40 }} />
            <div style={{ fontSize: 12, padding: 8 }}>
              {cardInfo.description}
            </div>
          </>
        )}
      </div>
      {facedown && !isYours ? null : (
        <div
          className="popover"
          style={{ border: "4px solid " + getTheaterColor(cardInfo.theater) }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingLeft: 4,
              paddingRight: 4,
              fontSize: 20,
            }}
          >
            <div style={{ fontWeight: "bold", marginRight: 8 }}>
              {cardInfo.value}
            </div>
            {cardInfo.name}
          </div>
          <div style={{ fontSize: 16 }}>{cardInfo.description}</div>
        </div>
      )}
    </>
  );
}
