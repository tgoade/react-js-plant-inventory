import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAwEshkuNVasDUYZX8Es3sJE5_O6CP5Q4o",
    authDomain: "plant-inventory-21562.firebaseapp.com",
    databaseURL: "https://auth-development-ce842-default-rtdb.firebaseio.com",
    projectId: "plant-inventory-21562",
    storageBucket: "plant-inventory-21562.appspot.com",
    messagingSenderId: "27312914912",
    appId: "1:27312914912:web:7e7df1a7894e03563aab85"
  };

  // Initialize Firebase and Firestore
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  export default db;