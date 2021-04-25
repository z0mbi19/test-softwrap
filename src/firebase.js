import firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBGiTLSslM8K6LS3v-GJwd-1eFHpj8fUHI",
  authDomain: "processo-seletivo-softwr-7cc39.firebaseapp.com",
  databaseURL:
    "https://processo-seletivo-softwr-7cc39-default-rtdb.firebaseio.com",
  projectId: "processo-seletivo-softwr-7cc39",
  storageBucket: "processo-seletivo-softwr-7cc39.appspot.com",
  messagingSenderId: "1074770943736",
  appId: "1:1074770943736:web:5e524ef48c0c118527650d",
  measurementId: "G-N66MG03B22",
});

export const auth = app.auth();
export default app;
