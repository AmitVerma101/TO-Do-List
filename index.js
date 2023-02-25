
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

document.getElementById("tArea").addEventListener("keyup",getValue);
let ans;
// console.log(typeof document.getElementById("tArea").value)




//Function that will be called on a key down event
function getValue(event){

   //if key is an enter then storing the element to the local storage
   if(event.keyCode==13){
     // localStorage.setItem(JSON.stringify(tArea.value));
     // addToList();
     if(tArea.value.trim()!=''){
      addToLocalStorage();
      //adding the element on the web page
     // addToList();
      
       //incrementing the value of i
        let x=JSON.parse(localStorage.getItem("i"));
        x++;
        localStorage.setItem("i",JSON.stringify(x)); 
     }
     tArea.value='' 
     
     tArea.blur();
     tArea.focus();
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
  
    if(arrayLocalStorage.length!=0){

    
   arrayLocalStorage.forEach(function(value){
      let str=document.createElement("div");
      str.style.display="flex"
      str.style.borderBottom="solid black 1px"
      str.style.justifyContent="space-between"
      if(value.checked==true){
         str.innerHTML=`<div style="text-decoration: line-through; flex-basis: 50%;" id=edit${value.id}>${value.name}</div>
         <div style:"display:flex ;flex-basis: 50%; min-width: 300px;">
         <button type="button"  onclick="editTheExistingValue(${value.id},edit${value.id})"><img id="editIcon" src="https://www.shutterstock.com/image-vector/edit-vector-icon-600w-546038194.jpg"></button>
         <input type="checkbox" onclick="checkIfSelect(${value.id})" Checked>
         <button type="button"  onclick="deleteThisItem(${value.id})">x</button>
         </div>`;
         // if(value.checked==true){
            
         //   str.style.textDecoration="line-through";
         // }
         //let myHr=document.createElement("hr");
         myDiv.appendChild(str)
        
      }
      else {
         str.innerHTML=`<div id=edit${value.id} style="flex-basis: 50%;">${value.name}</div>
         <div style:"display:flex; flex-basis: 50%; min-width: 300px;">
         <button type="button" onclick="editTheExistingValue(${value.id},edit${value.id})"><img id="editIcon" src="https://www.shutterstock.com/image-vector/edit-vector-icon-600w-546038194.jpg"></button>
         <input type="checkbox"  onclick="checkIfSelect(${value.id})">
         <button type="button"  onclick="deleteThisItem(${value.id})">x</button>
         </div>`;
         myDiv.appendChild(str)
      }
     
      
       //let myHr=document.createElement("hr");
      
      
   })
}
   //myDiv.innerHTML=str;
   
   
   
}

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

function editTheExistingValue(val,val2){
   let count=0;
   let ans;
   let obj=JSON.parse(localStorage.getItem("item"));
   obj.forEach(function(value){
         if(value.id==val){
               ans=count;
         }
         count++;
   })
   console.log(val,val2);
   val2.contentEditable=true;
   val2.style.outline="none";
   val2.addEventListener("blur",function(){
      contentBlur(val2,obj[ans].name,val)
   });
 //  val2.style.border="none"
   // val2.setAttribute("tabindex","0");
   val2.focus();
   val2.addEventListener("keydown",function(event){
      if(event.keyCode==13){
         // localStorage.setItem(JSON.stringify(tArea.value));
         // addToList();
         console.log("hy")
         console.log(val2.innerText)
        
         if(val2.innerText.trim()!=''){
           // console.log(val2.innerHTML)
          //  obj=JSON.parse(localStorage.getItem("item"));
           // console.log(obj,val2.innerText)
         
           obj[ans].name=val2.innerText.trim();
            console.log(obj)  
           localStorage.setItem("item",JSON.stringify(obj));
              val2.contentEditable=false;
         // addToLocalStorage();
          //adding the element on the web page
         // addToList();
          
           //incrementing the value of i
            
         }
         else {
            val2.contentEditable=false;
            val2.innerHTML=obj[ans].name;
         }
         console.log("here")
         // val2.contentEditable=false; 
         // val2.blur();
   }
      
   });
}
function contentBlur(val2,oldVal,val){
   if(val2.innerText.trim!=''){
      let count=0;
      let ans;
      let obj=JSON.parse(localStorage.getItem("item"));
      obj.forEach(function(value){
            if(value.id==val){
                  ans=count;
            }
            count++;
      })
      obj[ans].name=val2.innerText.trim();
      //console.log(obj)  
     localStorage.setItem("item",JSON.stringify(obj));

   }
   else {
      obj[ans].name=oldVal;
      val2.innerHTML=oldVal;
      //console.log(obj)  
     localStorage.setItem("item",JSON.stringify(obj));
   }
  val2.contentEditable=false;
}

