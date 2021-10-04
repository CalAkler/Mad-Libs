import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBbU9-Y6bLeon0HA3D_wnpEEbCEkCtxAok",
  authDomain: "mad-libs-13014.firebaseapp.com",
  databaseURL: "https://mad-libs-13014-default-rtdb.firebaseio.com",
  projectId: "mad-libs-13014",
  storageBucket: "mad-libs-13014.appspot.com",
  messagingSenderId: "292924123693",
  appId: "1:292924123693:web:f4a1f95757bb2f7dcee6a4"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;