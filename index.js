
let tArea=document.getElementById("tArea")
let obj=[];

//load function setting the variable i for the first time and also displaying all the localStorage elements
window.addEventListener("load",()=>{
   if(JSON.parse(localStorage.getItem("i"))==undefined){
      localStorage.setItem("i",JSON.stringify(0));
   }
  
   tArea.innerHTML=''
   displayLocalStorage();
})

//give the parsed value of the variable i
function getI(){
   return JSON.parse(localStorage.getItem("i"));
}


//Adding a listener on the textarea

document.getElementById("tArea").addEventListener("keydown",getValue);
let ans;
// console.log(typeof document.getElementById("tArea").value)




//Function that will be called on a key down event
function getValue(event){

   //if key is an enter then storing the element to the local storage
   if(event.keyCode==13){
     // localStorage.setItem(JSON.stringify(tArea.value));
     // addToList();
     addToLocalStorage();
     //adding the element on the web page
    // addToList();
      tArea.value='' 
      tArea.blur();
      //incrementing the value of i
       let x=JSON.parse(localStorage.getItem("i"));
       x++;
       localStorage.setItem("i",JSON.stringify(x));  
   }
  
   
  
    
}

//function to add the value into the local storage
function addToLocalStorage(){
   let tValue=tArea.value.trim();
    if(JSON.parse(localStorage.getItem("item"))==undefined){
      obj=[]
      let it= {id:getI(),name: tValue, checked: false};
      obj.push(it)
      localStorage.setItem("item",JSON.stringify(obj));
    }
    else {
          obj=JSON.parse(localStorage.getItem("item"));
          let it={id:getI(),name: tValue, checked: false};
          obj.push(it);
          localStorage.setItem("item",JSON.stringify(obj));

    }
    displayLocalStorage();
}


//function to display all the elements of the local storage
function displayLocalStorage(){
  // let myClass=document.getElementsByClassName("TaskBar")[0];
  let myDiv=document.getElementById("myDiv");
  myDiv.innerHTML=''
   
    
   let arrayLocalStorage=JSON.parse(localStorage.getItem("item"));
  // console.log(arrayLocalStorage)
  
    
   arrayLocalStorage.forEach(function(value){
      let str=document.createElement("div");
      str.style.display="flex"
      str.style.justifyContent="space-between"
      if(value.checked==true){
         str.innerHTML=`<div >${value.name}</div>
         <div style:"display:flex;">
         <input type="checkbox"  onclick="checkIfSelect(${value.id})" Checked>
         <button type="button"  onclick="deleteThisItem(${value.id})">x</button>
         </div>`;
         if(value.checked==true){
           str.style.textDecoration="line-through";
         }
         //let myHr=document.createElement("hr");
         myDiv.appendChild(str)
        
      }
      else {
         str.innerHTML=`<div >${value.name}</div>
         <div style:"display:flex;">
         <input type="checkbox"  onclick="checkIfSelect(${value.id})">
         <button type="button"  onclick="deleteThisItem(${value.id})">x</button>
         </div>`;
         myDiv.appendChild(str)
      }
     
      
       //let myHr=document.createElement("hr");
      
      
   })
   //myDiv.innerHTML=str;
   
   
   
}

//adding the item to list from the localStorage
// function addToList(){
//     let myDiv=document.getElementById("myDiv");
//     let arrayLocalStorage=JSON.parse(localStorage.getItem("item"));
//     let contentToBeFilled;
//     arrayLocalStorage.forEach(function(value){
//           if(value.id==getI()){
//             contentToBeFilled=value;
//           }
//     })
//    //  myDiv.style.display="flex";
//    //  myDiv.style.justifyContent="space-between"
//    //  myDiv.id=`myDiv`;
//    let str=document.createElement("div");
//    str.style.display="flex"
//    str.style.justifyContent="space-between"
//    str.innerHTML=`<div >${contentToBeFilled.name}</div>
//    <div style:"display:flex;>
//    <input type="checkbox"  onclick="checkIfSelect(${getI()}}">
//    <button type="button"  onclick="deleteThisItem(${getI()})">x</button>
//    </div>`
//    myDiv.appendChild(str);
//    location.reload();
//   // let myHr=document.createElement("hr");
//    //let myClass=document.getElementsByClassName("TaskBar")[0];
//    // myClass.appendChild(myDiv);
//    // myClass.appendChild(myHr);
// }

function checkIfSelect(val1,val2){
        console.log(val1)
        let count=0;
        let ans;
          obj=JSON.parse(localStorage.getItem("item"));
          obj.forEach(function(value){
            if(value.id==val1){
                     ans=count;
                     
            }
            count++;
          })
          console.log(!obj[ans].checked)
          obj[ans].checked=!obj[ans].checked;
          localStorage.setItem("item",JSON.stringify(obj));
         // location.reload();
         displayLocalStorage();
         
          
}
function deleteThisItem(val1){
   let count=0;
   let ans;
   let obj=JSON.parse(localStorage.getItem("item"));
   obj.forEach(function(value){
         if(value.id==val1){
               ans=count;
         }
         count++;
   })
   obj.splice(ans,1);
   localStorage.setItem("item",JSON.stringify(obj));
  // location.reload();
  displayLocalStorage();
  if(JSON.parse(localStorage.getItem("item")).length==0){
   let x=JSON.parse(localStorage.getItem("i"));
   x=0;
   localStorage.setItem("i",JSON.stringify(x));
 }
}