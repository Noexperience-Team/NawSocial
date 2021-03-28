import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAUx8-cfVMnMK_DF9-gdVw41_OrV56acho",
  authDomain: "nawsocial-e5c9f.firebaseapp.com",
  projectId: "nawsocial-e5c9f",
  storageBucket: "nawsocial-e5c9f.appspot.com",
  messagingSenderId: "728250021094",
  appId: "1:728250021094:web:e6c7a1d2c08ff357d0b727",
  measurementId: "G-WEDZH81V7S"
    // this is where your firebase config goes
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
const db = firebase.firestore()

export { auth, provider }
export default db