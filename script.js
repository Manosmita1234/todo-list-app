
let addTaskButton = document.getElementById("addTaskButton");
let taskinputText = document.getElementById("taskInput");
let container = document.getElementById("container");

function addTask(){
    let taskInput = taskinputText.value.trim();
    if(taskInput === ''){
        alert("please enter a task");
    }

    else{
  
        let taskContainer = document.createElement("div");
        taskContainer.className = "taskcontainer";

        let inputLabelContainer = document.createElement("div");
        inputLabelContainer.className = "inputLabel-container";

        let taskList = document.createElement("input");
        taskList.className = "input"
        taskList.type = "checkbox";
        
        let label = document.createElement("label");
        label.className = "taskLabel";
        label.textContent = taskInput;

        let icon = document.createElement("i");
        icon.className = "fa-solid fa-pen-to-square";
        icon.style.marginLeft = "auto";
        icon.style.cursor = "pointer";


        
        container.appendChild(taskContainer);
        taskContainer.appendChild(inputLabelContainer);
        inputLabelContainer.appendChild(taskList);  
        inputLabelContainer.appendChild(label);  
        inputLabelContainer.appendChild(icon);
        taskinputText.value = "";
        
        inputLabelContainer.addEventListener("click", ()=>{
          if(taskList.checked){
            label.style.textDecoration = "line-through";
            label.style.opacity = "0.5";
          }
          else{
            label.style.textDecoration = "none";
            label.style.opacity = "1";
          }
        })
      
    

     icon.addEventListener("click",()=>{
     const existingEditDiv = taskContainer.querySelector(".editDivContainer");
     if (existingEditDiv) {
    existingEditDiv.remove();
   }
    
      
     let editDiv = document.createElement("div");
     editDiv.className = "editDivContainer";


      editDiv.innerHTML = "";
      editDiv.style.height = "50px";
      editDiv.style.transform = "scaleY(1)"
      inputLabelContainer.style.opacity = "0.3";
      icon.style.pointerEvents = "none";
      taskList.disabled = true;
      let editTask = document.createElement("input");
      editTask.type = "text";
      editTask.style.border = "none";
      editTask.style.width = '90%';
      editTask.style.height = '90%';
      editTask.value = taskInput;
      editTask.className = "editTask";
      let saveChangeicon = document.createElement("i");
      saveChangeicon.className = "fas fa-check";

    
      saveChangeicon.addEventListener("click", ()=>{
        taskList.disabled = false;
        icon.style.pointerEvents = "auto";
        let editTaskInput = editTask.value.trim();
        label.textContent = editTaskInput;
        inputLabelContainer.style.opacity = "1";
        editTask.style.display = "none";
        saveChangeicon.style.display = "none";
        editDiv.style.transform = "scaleY(0)"
      
      })
       taskContainer.appendChild(editDiv);
     //inputLabelContainer.appendChild(editDiv);
      editDiv.appendChild(editTask);
      editDiv.appendChild(saveChangeicon);
     })
    }
        
    }
   




addTaskButton.addEventListener("click", addTask);