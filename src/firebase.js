import firebase from "firebase";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBuf8iLZ_Xl9ySOkq9kU9xzvZ-iJRL_VV4",
    authDomain: "ecommerce-bcbf2.firebaseapp.com",
    projectId: "ecommerce-bcbf2",
    storageBucket: "ecommerce-bcbf2.appspot.com",
    messagingSenderId: "426493699950",
    appId: "1:426493699950:web:dfd19909d8fd5c4eca037f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
