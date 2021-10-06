import { Cards } from "./cards";

//Fisher-Yates Shuffle
function shuffle(array) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export function dealHands() {
  let hands = [];
  let deck = Cards;

  deck = shuffle(deck);

  for (let i = 0; i < 3; i++) {
    let hand = [];
    for (let j = 0; j < 6; j++) {
      hand.push(deck[j + 6 * i]);
    }
    hands.push(hand);
  }

  return hands;
}
