
let addTaskButton = document.getElementById("addTaskButton");
let taskinputText = document.getElementById("taskInput");
let container = document.getElementById("container");
let searchInput = document.getElementById("searchTask");
let allTasksArray = [];


function addTask(){
    let taskInput = taskinputText.value.trim();
    if(taskInput === ''){
        alert("please enter a task");
    }

    else{
  
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
          inputLabelContainer: inputLabelContainer
        });
        

        let icon = document.createElement("i");
        icon.className = "fa-solid fa-pen-to-square";
        icon.style.marginLeft = "auto";
        icon.style.cursor = "pointer";

        let deleteicon = document.createElement("i");
        deleteicon.className = "fa-solid fa-trash";
        deleteicon.style.cursor = "pointer";
        deleteicon.style.padding = "5px";


        
        container.appendChild(taskContainer);
        taskContainer.appendChild(inputLabelContainer);
        inputLabelContainer.appendChild(taskList);  
        inputLabelContainer.appendChild(label);  
        inputLabelContainer.appendChild(icon);
        inputLabelContainer.appendChild(deleteicon);
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

   if(inputLabelContainer){
    inputLabelContainer.style.display = "none";
   }
   
     let editDiv = document.createElement("div");
     editDiv.className = "editDivContainer";


      editDiv.innerHTML = "";
      editDiv.style.height = "50px";
      editDiv.style.transform = "scaleY(1)"
     // inputLabelContainer.style.opacity = "0.3";
    
      icon.style.pointerEvents = "none";
      taskList.disabled = true;
      let editTask = document.createElement("input");
      editTask.focus();
      editTask.type = "text";
     // editTask.value = taskInput;
      editTask.value = label.textContent;
      editTask.className = "editTask";
      
      let saveChangeicon = document.createElement("i");
      saveChangeicon.className = "fas fa-check";

    
      saveChangeicon.addEventListener("click", ()=>{
        if (editDiv) {
          editDiv.remove();
         }

        inputLabelContainer.style.display = "flex";
        icon.style.marginLeft = "auto";
        //taskList.disabled = false;
        icon.style.pointerEvents = "auto";
        let editTaskInput = editTask.value.trim();
        label.textContent = editTaskInput;
        //inputLabelContainer.style.opacity = "1";
        editTask.style.display = "none";
        saveChangeicon.style.display = "none";
        editDiv.style.transform = "scaleY(0)"
      
      })
       taskContainer.appendChild(editDiv);
      editDiv.appendChild(editTask);
      editDiv.appendChild(saveChangeicon);
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
          task.inputLabelContainer.style.display = "flex";
        }
        else{
          task.inputLabelContainer.style.display = "none";
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

