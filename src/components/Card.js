import { useStore } from "react-context-hook";
import { setUserProperties } from "@firebase/analytics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import { getCardInfo, getTheaterColor } from "../utils/utils";
import Facedown from "./Facedown";
import "../css/Card.css";

const CARD_HEIGHT = "10.5rem";
const CARD_WIDTH = "7.3rem";

export default function Card({
  id,
  facedown = false,
  isYours = false,
  opposite,
  onClick,
  inHand = false,
}) {
  const [selectedCardID] = useStore("selectedCardID", null);
  const [facedownCardID, setFacedownCardID] = useStore("facedownCardID", null);

  let cardInfo = getCardInfo(id);
  if (cardInfo == null) {
    return null;
  }

  const shouldDisplayFacedown = facedown || facedownCardID === id;

  let color = shouldDisplayFacedown
    ? "#616575"
    : getTheaterColor(cardInfo.theater);

  let displayCardInfo = cardInfo;
  if (shouldDisplayFacedown) {
    displayCardInfo = {
      value: 2,
      description: null,
      name: "",
    };
  }

  const cardTitleStyle = {
    fontSize: "1rem",
    color: "#fff",
    fontWeight: "bold",
  };

  return (
    <div style={{ position: "relative" }}>
      {!isYours || !inHand ? null : (
        <div style={{ height: "2.5rem" }}>
          {selectedCardID === id ? (
            <button
              onClick={() => {
                if (facedownCardID === id) {
                  setFacedownCardID(null);
                } else {
                  setFacedownCardID(id);
                }
              }}
            >
              <FontAwesomeIcon icon={faSyncAlt} />
            </button>
          ) : null}
        </div>
      )}
      <div
        style={{
          minHeight: CARD_HEIGHT,
          width: CARD_WIDTH,
          backgroundColor: color,
          textAlign: "left",
          border: "0.5rem solid " + color,
          borderRadius: "0.2rem",
          padding: "0.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          ...{
            outline: selectedCardID === id ? "" : "0.15rem solid #fff",
            boxShadow:
              selectedCardID === id ? "0px 0px 0.3rem 0.2rem #fad460" : "",
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
            color: "#fff",
            textAlign: "right",
          }}
        >
          <div style={{ fontSize: "0.9rem", maxWidth: "100%" }}>
            {displayCardInfo.name}
          </div>
        </div>
        <div>
          {displayCardInfo.description != null ? (
            <div style={{ fontSize: "0.8rem" }}>
              {displayCardInfo.description}
            </div>
          ) : (
            <div style={{ fontSize: "3rem", fontWeight: 500 }}>
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
          style={{
            border: "0.3rem solid " + getTheaterColor(cardInfo.theater),
            [opposite ? "bottom" : "top"]: 0,
            [inHand ? "left" : "right"]: "calc(100% + 1rem)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingRight: "0.2rem",
              fontSize: "1.3rem",
              marginBottom: "0.2rem",
            }}
          >
            <div style={{ fontWeight: "bold", marginRight: "0.8rem" }}>
              {cardInfo.value}
            </div>
            {cardInfo.name}
          </div>
          <div style={{ fontSize: "1rem" }}>{cardInfo.description}</div>
        </div>
      )}
    </div>
  );
}
