import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getDatabase, ref, onValue  , child, get , set,push,update} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyCyTYhrssyWhM1P6db_ZS_UYXHzCEupX8g",
    authDomain: "split-662dd.firebaseapp.com",
    projectId: "split-662dd",
    storageBucket: "split-662dd.appspot.com",
    messagingSenderId: "418787962459",
    appId: "1:418787962459:web:ef0be705d33a524630997e",
    measurementId: "G-9ERQKCWY34"
  };
  "use strict";
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const userid = sessionStorage.getItem('Userid');
const database= getDatabase(app);
const dbref=ref(database);
get(child(dbref,"users/"+userid)).then((snapshot)=>{
    if (snapshot.exists()) {
        document.getElementById('name').placeholder=snapshot.val().name;
        document.getElementById('email').placeholder=snapshot.val().email;
       
      } else {
        window.alert("user not found");
      }
});