import { openDB } from 'idb';

const initdb = async () =>
  openDB('pwa-text-editor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('pwa-text-editor')) {
        console.log('pwa-text-editor database already exists');
        return;
      }
      db.createObjectStore('pwa-text-editor', { keyPath: 'id', autoIncrement: true });
      console.log('pwa-text-editor database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Put to the database');
  const pwaDb = await openDB('pwa-text-editor',1);
  const tx = pwaDb.transaction('pwa-text-editor', 'readwrite');
  const store = tx.objectStore('pwa-text-editor');
    const request = store.delete(content);
    const result = await request;
    console.log('result.value', result);
    return result;
    };

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  const pwaDb = await openDB('pwa-text-editor', 1);
  const tx = pwaDb.transaction('pwa-text-editor', 'readonly');
  const store = tx.objectStore('pwa-text-editor');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();

