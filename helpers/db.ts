import * as SQLite from 'expo-sqlite';
import { IPlace } from '../models/Place';

const db = SQLite.openDatabase('places.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (' +
          ' id INTEGER PRIMARY KEY NOT NULL' +
          ',title TEXT NOT NULL' +
          ',imageUri TEXT NOT NULL' +
          ',address TEXT NOT NULL' +
          ',lat REAL NOT NULL' +
          ',lng REAL NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (place: IPlace) => {
  const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
        [place.title, place.imageUri, place.address, place.lat, place.lng],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });

  return promise;
};

export const selectPlaces = () => {
  const promise = new Promise<SQLite.SQLResultSet>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM places;',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
          return false;
        }
      );
    });
  });

  return promise;
};
