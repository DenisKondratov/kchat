import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpLZrm1KWIrTsiJ7MFLLc7l1YQ0WKMtPc",
  authDomain: "kchat-6433f.firebaseapp.com",
  projectId: "kchat-6433f",
  storageBucket: "kchat-6433f.appspot.com",
  messagingSenderId: "150724511779",
  appId: "1:150724511779:web:457e3cbfec9dafcc4f8996"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase