export const Cards = [
  {
    name: "Support",
    value: 1,
    id: 1,
    description: (
      <>
        {"You gain "}
        <b>+3</b>
        {" Strength in each adjacent Theater."}
      </>
    ),
    theater: "air",
  },
  {
    name: "Air Drop",
    value: 2,
    id: 2,
    description:
      "The next time you play a card, you may play it to a non-matching Theater.",
    theater: "air",
  },
  {
    name: "Maneuver",
    value: 3,
    id: 3,
    description: "Flip an uncovered card in an adjacent Theater.",
    theater: "air",
  },
  {
    name: "Aerodrome",
    value: 4,
    id: 4,
    description: (
      <>
        {"You may play cards of strength "}
        <b>3</b>
        {" or less to non-matching Theaters."}
      </>
    ),
    theater: "air",
  },
  {
    name: "Containment",
    value: 5,
    id: 5,
    description: "If any player plays a facedown card, destroy that card.",
    theater: "air",
  },
  {
    name: "Heavy Bombers",
    value: 6,
    id: 6,
    description: null,
    theater: "air",
  },
  {
    name: "Transport",
    value: 1,
    id: 7,
    description: (
      <>
        {"You may move "}
        <b>1</b>
        {" of your cards to a different Theater."}
      </>
    ),
    theater: "sea",
  },
  {
    name: "Escalation",
    value: 2,
    id: 8,
    description: "All of your facedown cards are now strength 4.",
    theater: "sea",
  },
  {
    name: "Maneuver",
    value: 3,
    id: 9,
    description: "Flip an uncovered card in an adjacent Theater.",
    theater: "sea",
  },
  {
    name: "Redeploy",
    value: 4,
    id: 10,
    description: (
      <>
        {"You may return "}
        <b>1</b>
        {" of your facedown cards to your hand. If you do, play a card."}
      </>
    ),
    theater: "sea",
  },
  {
    name: "Blockade",
    value: 5,
    id: 11,
    description: (
      <>
        {
          "If any player plays a card to an adjacent Theater occupied by at least "
        }
        <b>3</b>
        {" other cards, destroy that card."}
      </>
    ),
    theater: "sea",
  },
  {
    name: "Super Battleship",
    value: 6,
    id: 12,
    description: null,
    theater: "sea",
  },
  {
    name: "Reinforce",
    value: 1,
    id: 13,
    description: (
      <>
        {"Draw "}
        <b>1</b>
        {" card and play it facedown to an adjacent Theater."}
      </>
    ),
    theater: "land",
  },
  {
    name: "Ambush",
    value: 2,
    id: 14,
    description: "Flip any uncovered card.",
    theater: "land",
  },
  {
    name: "Maneuver",
    value: 3,
    id: 15,
    description: "Flip an uncovered card in an adjacent Theater",
    theater: "land",
  },
  {
    name: "Cover Fire",
    value: 4,
    id: 16,
    description: (
      <>
        {"All cards covered by this card are now strength "}
        <b>4</b>
        {"."}
      </>
    ),
    theater: "land",
  },
  {
    name: "Disrupt",
    value: 5,
    id: 17,
    description: (
      <>
        {"Starting with you, both players choose and flip "}
        <b>1</b>
        {" of their uncovered cards."}
      </>
    ),
    theater: "land",
  },
  {
    name: "Heavy Tanks",
    value: 6,
    id: 18,
    description: null,
    theater: "land",
  },
];
