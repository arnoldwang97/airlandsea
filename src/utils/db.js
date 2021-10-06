import db from "./firebase";
import { ref, set, update, onValue, runTransaction } from "firebase/database";
import ShortUniqueId from "short-unique-id";
import { store } from "react-context-hook";
import { dealHands } from "./utils";
import { shuffle } from "./utils";

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
  };

  update(ref(db), updates);
}
