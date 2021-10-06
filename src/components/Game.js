import { useStore } from "react-context-hook";
import { getGameData } from "../utils/db";
export default function Game(props) {
  const { id } = props;
  const [gameData, setGameData] = useStore("game", null);

  useEffect(() => {
    getGameData(id, (data) => {
      setGameData(data);
    });
  }, [id]);

  return <div />;
}
