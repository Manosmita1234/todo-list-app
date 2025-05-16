
let addTaskButton = document.getElementById("addTaskButton");
let taskinputText = document.getElementById("taskInput");
let container = document.getElementById("container");
let searchInput = document.getElementById("searchTask");
let allTasksArray = [];


function addTask(){
  // Taking input from the user
    let taskInput = taskinputText.value.trim();
    if(taskInput === ''){
        alert("please enter a task");
        return;
    }

    else{
       //creation of taskcontainer that will contain inputLabelContainer and dataspan
        let taskContainer = document.createElement("div");
        taskContainer.className = "taskcontainer";

        let inputLabelContainer = document.createElement("div");
        inputLabelContainer.className = "inputLabelcontainer";
      
        let taskList = document.createElement("input");
        taskList.className = "input"
        taskList.type = "checkbox";
        
        let label = document.createElement("label");
        label.className = "taskLabel";
        label.textContent = taskInput;

        allTasksArray.push({
          label: label,
          taskContainer: taskContainer,
          taskList: taskList
        });
        

        let editIcon = document.createElement("i");
        editIcon.className = "fa-solid fa-pen-to-square";
        editIcon.style.marginLeft = "auto";
        editIcon.style.cursor = "pointer";

        let deleteicon = document.createElement("i");
        deleteicon.className = "fa-solid fa-trash";
        deleteicon.style.cursor = "pointer";
        deleteicon.style.padding = "5px";
      
         
       let dataSpan = document.createElement("span");
       dataSpan.className = "dataSpan";
       let date = new Date();
       let hours = date.getHours();
       let minutes = date.getMinutes().toString().padStart(2, '0');

      
       let day = date.getDate();
       let monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
       let month =monthNames[date.getMonth()];
       let year = date.getFullYear();
       let amPm = hours>=12? "PM":"AM";
       hours = hours % 12 || 12;
       let display = `${day} ${month} ${year} , ${hours}:${minutes} ${amPm}` ;
       dataSpan.innerText = display;      
        
        container.appendChild(taskContainer);
        taskContainer.appendChild(inputLabelContainer);
        taskContainer.appendChild(dataSpan);
        inputLabelContainer.appendChild(taskList);  
        inputLabelContainer.appendChild(label);  
        inputLabelContainer.appendChild(editIcon);
        inputLabelContainer.appendChild(deleteicon);
        taskinputText.value = "";
        
        //checking off of completed task
        function markDone(){
          
          if(taskList.checked){
            label.style.textDecoration = "line-through";
            label.style.opacity = "0.5";
          }
          else{
            label.style.textDecoration = "none";
            label.style.opacity = "1";
          }
        }

        taskContainer.addEventListener("change",markDone);
       
        // code to edit the existing task

     editIcon.addEventListener("click",()=>{     
     inputLabelContainer.style.display = "none";
     dataSpan.style.display = "none";
      
     let editDiv = document.createElement("div");
     editDiv.className = "editDivContainer";
     editDiv.style.height = "40px";

      let editTask = document.createElement("input");
      editTask.type = "text";
      editTask.value = label.textContent;
      editTask.className = "editTask";
      editTask.style.borderRadius = "15px";
      
      let saveChangeicon = document.createElement("i");
      saveChangeicon.className = "fas fa-check";

    
      saveChangeicon.addEventListener("click", ()=>{
      editDiv.remove();     

        inputLabelContainer.style.display = "flex";
        dataSpan.style.display = "flex";
        editIcon.style.marginLeft = "auto";
        editIcon.style.pointerEvents = "auto";
        let editTaskInput = editTask.value.trim();
        label.textContent = editTaskInput;
        editTask.style.display = "none";
        saveChangeicon.style.display = "none";
        editDiv.style.transform = "scaleY(0)"
      
      })
      taskContainer.appendChild(editDiv);
      editDiv.appendChild(editTask);
      editDiv.appendChild(saveChangeicon);
      editTask.focus();
     })

     deleteicon.addEventListener("click",()=>{
      taskContainer.remove();
     })

    }
        
    }

    function searchtask(){
      let searchingTask = searchInput.value.toLowerCase();
      allTasksArray.forEach(function(task){
        let existingvalue = task.label.innerText.toLowerCase();
        if(existingvalue.includes(searchingTask)){
          task.taskContainer.style.display = "flex";
        }
        else{
          task.taskContainer.style.display = "none";
        }
      });
    }
    
searchInput.addEventListener("input", searchtask);

addTaskButton.addEventListener("click", addTask);


taskinputText.addEventListener("keydown" , function(event){
  if(event.key === "Enter"){
    addTask();
  }
});


let dropDownMenu = document.getElementById("dropDownBtn");
let dropDownDiv = document.getElementById("dropDownDiv");

dropDownMenu.addEventListener("click",()=>{
  let existing = document.querySelector(".dropDownContentsContainer");
  if(existing){
    existing.remove();
    return;
  }
  const dropDownContentsContainer = document.createElement("div");
  dropDownContentsContainer.className = "dropDownContentsContainer";

  const deleteAllBtn = document.createElement("button");
  deleteAllBtn.textContent = "Delete all";

  const markAllDoneBtn = document.createElement("button");
  markAllDoneBtn.textContent = "Mark all done";

  const markAllUndoneBtn = document.createElement("button");
  markAllUndoneBtn.textContent = "Mark all undone";

  dropDownDiv.appendChild(dropDownmenu);
  dropDownDiv.appendChild(dropDownContentsContainer);
  dropDownContentsContainer.appendChild(deleteAllBtn);
  dropDownContentsContainer.appendChild(markAllDoneBtn);
  dropDownContentsContainer.appendChild(markAllUndoneBtn);
  
   deleteAllBtn.addEventListener("click", ()=>{
    allTasksArray.forEach(function(task){
      task.taskContainer.remove();
    })
  }
  );

  markAllDoneBtn.addEventListener("click",()=>{
        allTasksArray.forEach(function(task){
          task.label.style.textDecoration = "line-through";
          task.taskList.checked = true;
          task.label.style.opacity = "0.5";
        })
  })
  markAllUndoneBtn.addEventListener("click",()=>{
    allTasksArray.forEach(function(task){
      task.label.style.textDecoration = "none";
      task.taskList.checked = false;
      task.label.style.opacity = "1";
    })
  })


});