import { getCardInfo } from "../utils/utils";
import Facedown from "./Facedown";
import { useStore } from "react-context-hook";
import { setUserProperties } from "@firebase/analytics";

export default function Card(props) {
  const [selectedCardID] = useStore("selectedCardID", null);

  const id = props.id;
  const facedown = props.facedown ?? false;

  if (facedown) {
    return <Facedown />;
  } else {
    let cardInfo = getCardInfo(id);
    if (cardInfo == null) {
      return null;
    }
    return (
      <div
        style={{
          height: 150,
          width: 100,
          border: selectedCardID === id ? "2px solid green" : "1px solid black",
          textAlign: "center",
        }}
        onClick={props.onClick}
      >
        {cardInfo.value}
        {cardInfo.name}
        {cardInfo.description}
        {cardInfo.theater}
      </div>
    );
  }
}
