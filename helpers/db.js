import { SQLite } from "expo-sqlite";

const db = SQLite.openDatabase("transactions5.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY NOT NULL, googleDistance REAL NOT NULL,googleTravelTime REAL NOT NULL,googleCost REAL NOT NULL,appDistance REAL NOT NULL,appTravelTime REAL NOT NULL,appCost REAL NOT NULL,actualDistance REAL NOT NULL,actualTravelTime REAL NOT NULL,actualCost REAL NOT NULL,fromLocation TEXT NOT NULL,toLocation TEXT NOT NULL,userTraveledLocation TEXT NOT NULL,startTime  TEXT NOT NULL,endTime TEXT NOT NULL,userId TEXT NOT NULL);`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertTransaction = (
  googleDistance,
  googleTravelTime,
  googleCost,
  appDistance,
  appTravelTime,
  appCost,
  actualDistance,
  actualTravelTime,
  actualCost,
  fromLocation,
  toLocation,
  userTraveledLocation,
  startTime,
  endTime,
  userId
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO transactions (googleDistance, googleTravelTime, googleCost, appDistance, appTravelTime, appCost, actualDistance, actualTravelTime, actualCost, fromLocation, toLocation, userTraveledLocation, startTime, endTime, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          googleDistance,
          googleTravelTime,
          googleCost,
          appDistance,
          appTravelTime,
          appCost,
          actualDistance,
          actualTravelTime,
          actualCost,
          fromLocation,
          toLocation,
          userTraveledLocation,
          startTime,
          endTime,
          userId,
        ],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchTransactions = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM transactions",
        [],
        (_, result) => {
          // console.log(result);
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
