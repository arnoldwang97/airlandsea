import { useStore } from "react-context-hook";
import { setUserProperties } from "@firebase/analytics";

import { getCardInfo, getTheaterColor } from "../utils/utils";
import Facedown from "./Facedown";
import "../css/Card.css";

const CARD_HEIGHT = 180;
const CARD_WIDTH = 120;

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

  let displayCardInfo = cardInfo;
  if (facedown) {
    displayCardInfo = {
      value: 2,
      description: null,
      name: "",
    };
  }

  const cardTitleStyle = {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          minHeight: CARD_HEIGHT,
          width: CARD_WIDTH,
          backgroundColor: color,
          textAlign: "left",
          border: "6px solid " + color,
          borderRadius: 4,
          padding: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          ...{
            outline:
              selectedCardID === id ? "4px solid #e4da7a" : "2px solid #fff",
            flexDirection: opposite ? "column-reverse" : "column",
          },
        }}
        onClick={isYours ? onClick : null}
        className="anchor"
      >
        <div
          style={{
            ...cardTitleStyle,
            position: "absolute",
            top: 0,
            [opposite ? "right" : "left"]: 0,
          }}
        >
          {displayCardInfo.value}
        </div>
        <div
          style={{
            position: "absolute",
            [opposite ? "bottom" : "top"]: 0,
            right: 0,
            fontSize: 16,
            color: "#fff",
            textAlign: "right",
          }}
        >
          <div style={{ fontSize: displayCardInfo.name.length > 9 ? 12 : 16 }}>
            {displayCardInfo.name}
          </div>
        </div>
        <div>
          {displayCardInfo.description != null ? (
            <div style={{ fontSize: 13 }}>{displayCardInfo.description}</div>
          ) : (
            <div style={{ fontSize: 40, fontWeight: 500 }}>
              {displayCardInfo.value}
            </div>
          )}
        </div>
        <div
          style={{
            ...cardTitleStyle,
            position: "absolute",
            bottom: 0,
            [opposite ? "left" : "right"]: 0,
          }}
        >
          {displayCardInfo.value}
        </div>
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
              paddingRight: 4,
              fontSize: 20,
              marginBottom: 4,
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
    </div>
  );
}
