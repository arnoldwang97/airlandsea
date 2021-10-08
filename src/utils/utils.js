import { Cards } from "./cards";

import { store } from "react-context-hook";

//Fisher-Yates Shuffle
export function shuffle(array) {
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
      hand.push(deck[j + 6 * i].id);
    }
    hands.push(hand);
  }

  return hands;
}

export function removeCard(hand, cardID) {
  const index = hand.indexOf(cardID);
  if (index < 0) {
    return;
  }
  hand.splice(index, 1);
  return hand;
}

export function getCardInfo(cardID) {
  return Cards.filter((card) => card.id === cardID)[0];
}

export function getPlayer(playerID) {
  const player1ID = store.getState().game.player1;
  const player2ID = store.getState().game.player2;

  if (playerID === player1ID) {
    return "player1";
  } else if (playerID === player2ID) {
    return "player2";
  }

  return null;
}
