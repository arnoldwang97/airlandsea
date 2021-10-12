import TableEntry from "./CommanderComponents/TableEntry";
import "../css/Card.css";

export const COMMANDER_POINTS = {
  player1: {
    position: "1st Player",
    ties: "Wins Tied Theaters",
    cardsLeft: ["4+", "2-3", "1", "0"],
    color: "#c42929",
  },
  player2: {
    position: "2nd Player",
    ties: "Loses Tied Theaters",
    cardsLeft: ["5+", "3-4", "2", "0-1"],
    color: "#1b2ccc",
  },
};

const POINTS = [2, 3, 4, 6];

export default function Commanders({ currentPlayer, otherPlayer }) {
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
      <div
        style={{
          backgroundColor: COMMANDER_POINTS[currentPlayer].color,
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: 48,
          }}
        >
          {COMMANDER_POINTS[currentPlayer].position}
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: 20,
          }}
        >
          {COMMANDER_POINTS[currentPlayer].ties}
        </div>
        <table
          style={{
            borderCollapse: "collapse",
          }}
        >
          <tr>
            <th>Cards Left in your hand</th>
            <th>Points Opponent Scores if you Withdraw</th>
          </tr>

          {COMMANDER_POINTS[currentPlayer].cardsLeft.map((cleft, index) => (
            <tr>
              <TableEntry className="left" val={cleft} />
              <TableEntry className="left" val={POINTS[index]} />
            </tr>
          ))}
        </table>
      </div>
      <div
        style={{
          backgroundColor: COMMANDER_POINTS[otherPlayer].color,
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: 48,
          }}
        >
          {COMMANDER_POINTS[otherPlayer].position}
        </div>
        <div
          style={{
            textAlign: "center",
            fontSize: 20,
          }}
        >
          {COMMANDER_POINTS[otherPlayer].ties}
        </div>
        <table
          style={{
            borderCollapse: "collapse",
          }}
        >
          <tr>
            <th>Cards Left in your hand</th>
            <th>Points Opponent Scores if you Withdraw</th>
          </tr>

          {COMMANDER_POINTS[otherPlayer].cardsLeft.map((cleft, index) => (
            <tr>
              <TableEntry className="right" val={cleft} />
              <TableEntry className="right" val={POINTS[index]} />
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
