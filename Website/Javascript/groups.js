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
get(child(dbref,"users/"+userid+'/group/')).then((snapshot)=>{
 if(snapshot.exists()) { const gr = snapshot.val();
   group(gr);}
   else{
       window.alert('No Transactions Yet');
   }
}).catch((error)=>{

});

function group(gr){
    let make = document.getElementById('group-info');
    console.log(gr);
    for(let x in gr){
       let groupfirst=document.createElement('div');
       groupfirst.setAttribute("class","card-body bg-secondary text-light pt-3")
       let groupsecond=document.createElement('div');
       groupsecond.setAttribute("class","row");
       let groupthird1=document.createElement('div');
       groupthird1.setAttribute("class","col-sm-4");
       let groupthird1a=document.createElement('a');
       groupthird1a.setAttribute("class","card-title");
       groupthird1a.setAttribute("data-bs-toggle","modal");
       groupthird1a.setAttribute("data-bs-target","#group-modal");
       let groupthird1ah4=document.createElement('h4');
       groupthird1ah4.appendChild(document.createTextNode(x));
       groupthird1.appendChild(groupthird1a.appendChild(groupthird1ah4));
       let groupthird2=document.createElement('div');
       groupthird2.setAttribute("class","col-sm-3");
       griupthird2.appendChild(document.createTextNode(gr[x][Amount]));
       let groupthird3=document.createElement('div');
       groupthird3.setAttribute("class","col-sm-4");
       let button= document.createElement("button")
       button.setAttribute("class","btn btn-primary finish");
       button.setAttribute("data-bs-toggle","tooltip");
       button.setAttribute("title","Settle sll your payments for this group");
       button.appendChild(document.createTextNode('Finish'));
       groupthird3.appendChild(button);
       groupsecond.appendChild(groupthird1);
       groupsecond.appendChild(groupthird2);
       groupsecond.appendChild(groupthird3);
       groupfirst.appendChild(groupsecond);
       make.appendChild(groupfirst);
    }
}

