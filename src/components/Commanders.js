export const COMMANDER_POINTS = {
  player1: {
    position: "1st Player",
    ties: "Wins Tied Theaters",
    cardsLeft: ["4+", "2-3", "1", "0"],
  },
  player2: {
    position: "2nd Player",
    ties: "Loses Tied Theaters",
    cardsLeft: ["5+", "3-4", "2", "0-1"],
  },
};

const POINTS = [2, 3, 4, 6];

export default function Commanders({ currentPlayer, otherPlayer }) {
  return (
    <div>
      {COMMANDER_POINTS[currentPlayer].position}
      {COMMANDER_POINTS[currentPlayer].ties}
      Cards Left in your hand | Points Opponent Scores if you Withdraw
      {COMMANDER_POINTS[currentPlayer].cardsLeft.map((cleft, index) => (
        <div>
          {cleft}
          {POINTS[index]}
        </div>
      ))}
    </div>
  );
}
