import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useStore } from "react-context-hook";
import uniqueString from "unique-string";

export default function PlayerIDCheck() {
  const [cookies, setCookie] = useCookies(["id"]);
  const [playerID, setPlayerID] = useStore("id", null);
  const { id } = cookies;

  useEffect(() => {
    if (id == null) {
      const newID = uniqueString();
      setCookie("id", newID, { path: "/" });
      setPlayerID(newID);
    } else {
      setPlayerID(id);
    }
  }, [id]);
  return <div />;
}
