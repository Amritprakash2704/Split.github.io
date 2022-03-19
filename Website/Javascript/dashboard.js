// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getDatabase, ref, onValue  , child, get , set,push,update} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
import { getStorage,ref as rf ,uploadBytes,getDownloadURL,deleteObject } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-storage.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"

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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database= getDatabase(app);
const cloud=getFirestore(app);
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
});
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
    console.log(group+person+amount);
    let val=30;
    get(child(dbref, 'users/'+userid+'/group/'+group.value+'/Amount')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let sum;
      sum= parseInt(snapshot.val());
       sum+=parseInt(amount.value);
      sessionStorage.setItem('sum',sum);
        console.log(sum);
        
      } else {
        
        let sum;
         sum=amount.value;
         sessionStorage.setItem('sum',sum);
        console.log("No data available");
        
      }
    }).catch((error) => {
      
    });
    setTimeout(settransac,2000)
    function settransac() { 
      
      val= sessionStorage.getItem('sum');
      console.log(val);
  set(ref(database,'users/'+userid+'/group/'+group.value), {
      Amount:val,
      }).then((check)=>{
        console.log("sucessful");
      })
    };
   const add = {
     Amount: amount.value
   }
   const newPostKey = push(child(ref(database), 'posts')).key;

   // Write the new post's data simultaneously in the posts list and the user's post list.
   const updates = {};
   updates['/users/'+ userid+'/Groups/'+group.value+'/'+person.value+'/'+ newPostKey] = add;
   setTimeout(reload,6000);
   return update(ref(database), updates);
   
   
});

get(child(dbref, 'users/'+userid+'/group/')).then((snapshot) => {
  if (snapshot.exists()) {
   const x =snapshot.val();
    console.log(x);  
    create(x);   
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
function create(cr){
    for(let y in cr){
      for(let z in cr[y]){
        const div = document.createElement("div");
        div.setAttribute("class","card-body created");
        const para = document.createElement("p");
        para.appendChild(document.createTextNode("Group : "+y));
        div.appendChild(para);
        div.appendChild(document.createTextNode("Amount : "+cr[y][z]));
        const element = document.getElementById("card1");
        element.appendChild(div);
       
      }
    }
};
function reload(){
  window.location.reload();
  // console.log("Hello");
}


