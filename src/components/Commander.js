export const Commanders = [
  {
    position: "1st Player",
    ties: "Wins Tied Theaters",
    cardsLeft: ["4+", "2-3", "1", "0"],
  },
  {
    position: "2nd Player",
    ties: "Loses Tied Theaters",
    cardsLeft: ["5+", "3-4", "2", "0-1"],
  },
];

export default function Commander({ position, ties, cardsLeft }) {}
