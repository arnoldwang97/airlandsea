import TableEntry from "./CommanderComponents/TableEntry";
import "../css/Commanders.css";

export const COMMANDER_POINTS = {
  player1: {
    position: "1st Player",
    ties: "Wins Tied Theaters",
    cardsLeft: ["4+", "2-3", "1", "0"],
    color: "#813636",
  },
  player2: {
    position: "2nd Player",
    ties: "Loses Tied Theaters",
    cardsLeft: ["5+", "3-4", "2", "0-1"],
    color: "#334569",
  },
};

const POINTS = [2, 3, 4, 6];

export default function Commanders({ currentPlayer, otherPlayer }) {
  return (
    <div
      className="commanderCards"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      {[currentPlayer ?? "player1", otherPlayer ?? "player2"].map(
        (player, index) => {
          const isYourPlayer = index === 0 || currentPlayer == null;
          // Make the card for the other player smaller
          const multiplier = index === 0 || currentPlayer == null ? 1 : 0.8;
          const scale = (value) => value * multiplier;

          return (
            <div
              style={{
                borderRadius: scale(12),
                backgroundColor: COMMANDER_POINTS[player].color,
                paddingBottom: scale(16),
                paddingTop: scale(16),
                paddingRight: scale(8),
                paddingLeft: scale(8),
                boxShadow:
                  index === 0 && currentPlayer != null
                    ? "0px 0px 10px 5px #fce08a"
                    : "",
                marginRight: 16,
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                width: scale(250),
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  fontSize: scale(48),
                  fontWeight: 600,
                }}
              >
                {COMMANDER_POINTS[player].position}
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: scale(20),
                  marginBottom: scale(8),
                }}
              >
                {COMMANDER_POINTS[player].ties}
              </div>
              <table
                style={{
                  fontSize: scale(18),
                  borderCollapse: "collapse",
                }}
              >
                <tr valign="bottom" className="pointsTitleContainer">
                  <th className="pointsTitle">Cards left in your hand</th>
                  <th className="pointsTitle">
                    Points opponent scores if you withdraw
                  </th>
                </tr>
                {COMMANDER_POINTS[player].cardsLeft.map((cleft, index) => (
                  <tr>
                    <td
                      style={{
                        paddingTop: 8,
                        textAlign: "center",
                        width: scale(120),
                        fontWeight: "bold",
                      }}
                    >
                      {cleft}
                    </td>
                    <td
                      style={{
                        paddingTop: 8,
                        textAlign: "center",
                        width: scale(120),
                      }}
                    >
                      {POINTS[index]}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          );
        }
      )}
    </div>
  );
}
