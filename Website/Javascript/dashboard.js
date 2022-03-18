// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getDatabase, ref, onValue  , child, get , set } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
import { getStorage,ref as rf ,uploadBytes,getDownloadURL,deleteObject } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyTYhrssyWhM1P6db_ZS_UYXHzCEupX8g",
  authDomain: "split-662dd.firebaseapp.com",
  projectId: "split-662dd",
  storageBucket: "split-662dd.appspot.com",
  messagingSenderId: "418787962459",
  appId: "1:418787962459:web:ef0be705d33a524630997e",
  measurementId: "G-9ERQKCWY34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database= getDatabase(app);
const userid = sessionStorage.getItem('Userid');
const storage=getStorage(app);
const storageRef = rf(storage, "profile-pics/"+userid);
var profilepic=document.getElementById('picture');
console.log(userid);
const dbref=ref(database);
get(child(dbref,"users/"+userid)).then((snapshot)=>{
    if (snapshot.exists()) {
        document.getElementById('name').placeholder=snapshot.val().name;
        document.getElementById('email').placeholder=snapshot.val().email;
       
      } else {
        window.alert("user not found");
      }
})
// sessionStorage.removeItem('Userid');
getDownloadURL(storageRef)
.then((url) => {
  console.log(url);
  document.getElementById('profile-pic').src=url;
 })

document.getElementById('logout').addEventListener("click",event=>{
    sessionStorage.removeItem('Userid');
   signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    
});

document.getElementById('pic-change').addEventListener("click", event=>{
    document.getElementById('pic-form').style.visibility="visible";
    document.getElementById('pic-change').style.visibility="hidden";
});
document.getElementById('pic-form').addEventListener("submit",event=>{
    event.preventDefault();

    uploadBytes(storageRef, profilepic.files[0]).then((snapshot) => {
        console.log(snapshot.url);
        console.log('Uploaded a blob or file!');
    });
    document.getElementById('pic-form').style.visibility="hidden";
    document.getElementById('pic-change').style.visibility="visible";
});
document.getElementById('nopic').addEventListener('click',event=>
{   document.getElementById('profile-pic').src="../../images/man.png";
deleteObject(storageRef).then(() => {
    console.log("deleted successfully");
    // File deleted successfully
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
document.getElementById('pic-form').style.visibility="hidden";
document.getElementById('pic-change').style.visibility="visible";
});

document.getElementById('transac').addEventListener('submit',event=>{
    event.preventDefault();
    const group=document.getElementById('transac-group');
    const person=document.getElementById('transac-person');
    const amount=document.getElementById('transac-amount');
    console.log(group.value+person.value+amount.value);
    
    set(ref(database,'users/'+userid+'/Groups/'+group.value),{
       Person:person.value,
       Amount:amount.value
    })
    window.alert('Done refresh to add more');
});


