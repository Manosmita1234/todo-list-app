
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

        
    }
   

}


addTaskButton.addEventListener("click", addTask);