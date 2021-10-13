import db from "./firebase";
import { ref, set, update, onValue, runTransaction } from "firebase/database";
import ShortUniqueId from "short-unique-id";
import { store } from "react-context-hook";
import { dealHands, getPlayer } from "./utils";
import { shuffle } from "./utils";
import { removeCard } from "./utils";

export function createRoom(cb) {
  const playerID = store.getState().id;
  const uid = new ShortUniqueId({ length: 6 });
  const roomID = uid();
  set(ref(db, "rooms/" + roomID), {
    owner: playerID,
    players: [playerID],
  }).then(() => {
    cb(roomID);
  });
}

export function updateRoomField(key, value, roomID) {
  // Using transactions to make sure that concurrent writes do not mess up the data
  runTransaction(ref(db, "rooms/" + roomID + "/" + key), (_) => {
    return value;
  });
}

export function getRoomData(id, cb) {
  const roomRef = ref(db, "rooms/" + id);
  onValue(roomRef, (snapshot) => {
    const data = snapshot.val();
    cb(data);
  });
}

export function getGameData(id, cb) {
  const gameRef = ref(db, "games/" + id);
  onValue(gameRef, (snapshot) => {
    const data = snapshot.val();
    cb(data);
  });
}

export function startGame(roomID, players) {
  if (roomID == null || players == null || players.length < 2) {
    return;
  }

  const updates = {};
  updates["rooms/" + roomID + "/isPlaying"] = true;

  const hands = dealHands();
  const firstPlayerIndex = Math.floor(Math.random() * 2); // randomly 0 or 1 to decide who goes first
  updates["games/" + roomID] = {
    player1: players[firstPlayerIndex],
    player2: players[1 - firstPlayerIndex],
    hands: {
      player1: hands[0],
      player2: hands[1],
      deck: hands[2],
    },
    order: shuffle(["air", "land", "sea"]).join("/"),
    score: {
      [players[0]]: 0,
      [players[1]]: 0,
    },
  };

  update(ref(db), updates);
}

export function nextRound(roomID, playerID) {
  if (roomID == null) {
    return;
  }

  runTransaction(ref(db, "games/" + roomID), (game) => {
    const hands = dealHands();

    const curP1 = game.player1;
    const curP2 = game.player2;
    const order = game.order.split("/");
    const cardsInHands = game.hands[getPlayer(playerID)];
    const elem = order.shift();
    order.push(elem);

    game.player1 = curP2;
    game.player2 = curP1;
    game.hands.player1 = hands[0];
    game.hands.player2 = hands[1];
    game.hands.deck = hands[2];
    game.order = order.join("/");
    game.theaters = {};

    //updates scores

    if (curP1 == playerID) {
      switch (cardsInHands) {
        case 6:
        case 5:
        case 4:
          game.score[playerID] += 2;
        case 3:
        case 2:
          game.score[playerID] += 3;
        case 1:
          game.score[playerID] += 4;
        case 0:
          game.score[playerID] += 6;
      }
    } else {
      switch (cardsInHands) {
        case 6:
        case 5:
          game.score[playerID] += 2;
        case 4:
        case 3:
          game.score[playerID] += 3;
        case 2:
          game.score[playerID] += 4;
        case 1:
        case 0:
          game.score[playerID] += 6;
      }
    }
    return game;
  });
}

export function playCardToTheater(roomID, theater) {
  const playerID = store.getState().id;
  const cardID = store.getState().selectedCardID;
  const isNextFacedown = store.getState().nextFacedown ?? false;
  console.log(isNextFacedown);

  if (cardID == null) {
    return;
  }

  runTransaction(ref(db, "games/" + roomID), (game) => {
    const playerKey = getPlayer(playerID);
    let theaters = game.theaters;
    if (theaters == null) {
      theaters = {};
    }
    if (theaters[theater] == null) {
      theaters[theater] = {};
    }
    if (theaters[theater][playerKey] == null) {
      theaters[theater][playerKey] = [];
    }

    //reinforce add card to hand
    if (cardID == 13 && !isNextFacedown) {
      let drawnCardID = game.hands.deck[0];
      game.hands.deck = removeCard(game.hands.deck, drawnCardID);
      game.hands[playerKey].push(drawnCardID);
    }
    theaters[theater][playerKey].push({
      id: cardID,
      facedown: isNextFacedown,
    });
    game.hands[playerKey] = removeCard(game.hands[playerKey], cardID);
    game.theaters = theaters;

    return game;
  });
}

export function returnCardToHand(cardID) {
  const selectedCardID = store.getState().selectedCardID;
  if (selectedCardID != null) {
    return;
  }
  const playerID = store.getState().id;
  const roomID = store.getState().roomID;

  const playerKey = getPlayer(playerID);

  runTransaction(ref(db, "games/" + roomID), (game) => {
    Object.keys(game.theaters)?.forEach((theater) => {
      const cardIDs = game.theaters[theater][playerKey]?.map((card) => card.id);
      if (cardIDs?.includes(cardID)) {
        game.theaters[theater][playerKey].splice(cardIDs.indexOf(cardID), 1);
        if (game.hands[playerKey] == null) {
          game.hands[playerKey] = [];
        }
        game.hands[playerKey].push(cardID);
      }
    });
    return game;
  });
}

export function flipCard(cardID) {
  const selectedCardID = store.getState().selectedCardID;
  if (selectedCardID != null) {
    return;
  }
  const playerID = store.getState().id;
  const roomID = store.getState().roomID;

  const playerKey = getPlayer(playerID);
  runTransaction(ref(db, "games/" + roomID), (game) => {
    Object.keys(game.theaters)?.forEach((theater) => {
      const cardIDs = game.theaters[theater][playerKey]?.map((card) => card.id);
      if (cardIDs?.includes(cardID)) {
        game.theaters[theater][playerKey][cardIDs.indexOf(cardID)].facedown =
          !game.theaters[theater][playerKey][cardIDs.indexOf(cardID)].facedown;
      }
    });
    return game;
  });
}

export function restartGame() {
  const roomID = store.getState().roomID;

  runTransaction(ref(db, "games/" + roomID), (game) => {
    return null;
  });
  runTransaction(ref(db, "rooms/" + roomID), (room) => {
    return {
      ...room,
      isPlaying: false,
    };
  });
}
