import { elements } from "./dom.js" ;
import { getDateData } from "./dateutils.js";
import { quill } from "./main.js";



export let allTasksArray = [];

export function createElements(taskText){

    let taskContainerWrapper = document.createElement("div");
    taskContainerWrapper.className = "taskContainerWrapper";

    let taskContainer = document.createElement("div");
    taskContainer.className = "taskContainer";
    taskContainer.setAttribute("draggable","true");

    let checkboxLabelContainer = document.createElement("div");
    checkboxLabelContainer.className = "checkboxLabelContainer";

    const { editDeleteContainer, editTaskbtn, deleteTaskbtn } = createEditDeleteContainer();


    let editDeleteButton = document.createElement("button");
    editDeleteButton.className = "fa-solid fa-ellipsis-vertical";
    editDeleteButton.addEventListener("click",()=>{
        const existing= document.querySelector(".editDeleteContainer");
        if(existing){
            existing.remove();
            return
        }
        editDeleteButton.appendChild(editDeleteContainer);
    })
    
    let dragicon = document.createElement("i");
    dragicon.className = "fa-solid fa-grip-vertical dragIcon";
    dragicon.style.padding = "5px 6px";
    dragicon.style.cursor = "grab";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";

    let taskLabel = document.createElement("label");
    taskLabel.className = "taskLabel";
    taskLabel.innerHTML = taskText;

    let dataSpan = createDataSpan();
    dataSpan.className = "dataSpan";
   
    let { editDivContainer, editTask, saveChangeIcon } = createEditDiv(taskText);

    elements.taskContainerWrapper.appendChild(taskContainer);
    taskContainer.appendChild(checkboxLabelContainer);
    taskContainer.appendChild(dataSpan);
    taskContainer.appendChild(editDivContainer);
    checkboxLabelContainer.appendChild(dragicon);
    checkboxLabelContainer.appendChild(checkbox);
    checkboxLabelContainer.appendChild(taskLabel);
    checkboxLabelContainer.appendChild(editDeleteButton);

    allTasksArray.push({
        taskContainer,
        taskLabel,
        checkbox,
        dragicon
    });

    return {taskContainer,
        checkbox,
        taskLabel,
        dataSpan,
        checkboxLabelContainer,
        editDivContainer,
        editTask,
        deleteTaskbtn,
        editTaskbtn,
        dragicon,
        saveChangeIcon,
    };
}

function createEditDeleteContainer(){
     
    let editDeleteContainer = document.createElement("div");
    editDeleteContainer.className = "editDeleteContainer";

    let editTaskbtn = document.createElement("button");
    editTaskbtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit`;

    let deleteTaskbtn = document.createElement("button");
    deleteTaskbtn.innerHTML = `<i class="fa-solid fa-trash"></i> Delete`;
    deleteTaskbtn.style.color = "red";

    editDeleteContainer.appendChild(editTaskbtn);
    editDeleteContainer.appendChild(deleteTaskbtn)

    return { editDeleteContainer, editTaskbtn, deleteTaskbtn };
}


export function addTask(){
 
   let taskText = quill.root.innerHTML.trim();
        if(taskText === "" || taskText === "<p><br></p>"){
        alert("Please Enter a task");
        return;
    }

   let task = createElements(taskText);
   attachListeners(task);

   storeDataToLocalStorage();

    quill.root.innerHTML = ""; 
   setTimeout(() => quill.focus(), 0);

   setupDragEvents(task.taskContainer);

}

function attachListeners({taskContainer,checkbox,
           taskLabel,dataSpan,checkboxLabelContainer,
           editDivContainer,saveChangeIcon,editTask,editTaskbtn,deleteTaskbtn}){

    checkbox.addEventListener("click",()=>{
        markCompleteTask(checkbox,taskLabel);
        storeDataToLocalStorage();
    });

    editTaskbtn.addEventListener("click",()=>{
        checkboxLabelContainer.style.display = "none";
        dataSpan.style.display = "none";
        editDivContainer.style.display = "flex";
        editTask.focus();
        });

    deleteTaskbtn.addEventListener("click",()=>{
             const nextSibling = taskContainer.nextSibling;

        let deletedtaskData = {
            taskText: taskLabel.innerHTML,
            checkStatus:checkbox.checked,
            nextSibling: nextSibling
        }
     
        allTasksArray = allTasksArray.filter(task => task.taskContainer !== taskContainer);
        taskContainer.remove();
        storeDataToLocalStorage();

        handleUndoDiv(deletedtaskData.taskText,deletedtaskData.checkStatus,deletedtaskData.nextSibling);

        })    

    saveChangeIcon.addEventListener("click",()=>{
        let newTask = editTask.value;
        checkboxLabelContainer.style.display = "flex";
        dataSpan.style.display = "flex";
        taskLabel.innerHTML = newTask;
        editDivContainer.style.display = "none";

       storeDataToLocalStorage();
    });
}
    
function createDataSpan(){
    let dateSpan = document.createElement("span");
    dateSpan.textContent = getDateData();
    return dateSpan;
}


function createEditDiv(editDivValue){
    let editDivContainer = document.createElement("div");
    editDivContainer.className = "editDivContainer";
    editDivContainer.style.display = "none";
    
    let editTask = document.createElement("input");
    editTask.type = "text";
    editTask.className = "editTask";
    editTask.value = editDivValue;

    let saveChangeIcon = document.createElement("i");
    saveChangeIcon.className = "fas fa-check";

    editDivContainer.appendChild(editTask);
    editDivContainer.appendChild(saveChangeIcon);
    
    return {editDivContainer,editTask,saveChangeIcon} ;
}

function handleUndoDiv(taskText,checkbox,nextSibling){
    let undoDiv = document.createElement("div");
    undoDiv.className = "undoDiv";
    undoDiv.textContent = "task deleted";

    let undoButton = document.createElement("button");
    undoButton.className = "undoButton";
    undoButton.textContent = "Undo";

    let closeIcon = document.createElement("i");
    closeIcon.className = "fa-solid fa-xmark";
    closeIcon.style.cursor = "pointer";

    if (nextSibling) {
  elements.container.insertBefore(undoDiv, nextSibling);
} else {
  elements.container.appendChild(undoDiv);
}

    undoDiv.appendChild(undoButton);
    undoDiv.appendChild(closeIcon);

    setTimeout(()=>{
        undoDiv.style.display = "none";
    },5000);

    undoButton.addEventListener("click",()=>{
        const existing = document.querySelector(".undoDiv");
        if(existing){
            undoDiv.remove();
        }
         let task = createElements(taskText);
         task.checkbox.checked = checkbox;
         markCompleteTask(task.checkbox ,task.taskLabel)
         attachListeners(task);

         storeDataToLocalStorage();
    });

    closeIcon.addEventListener("click",()=>{
        undoDiv.remove();
    })
}

    
function markCompleteTask(checkbox,taskLabel){
    if(checkbox.checked){
        taskLabel.style.textDecoration = "line-through";
        taskLabel.style.opacity = "0.5"; 
    }
    else{
        taskLabel.style.textDecoration = "none";
        taskLabel.style.opacity = "1";
    }
}


function storeDataToLocalStorage(){
   let data = allTasksArray.map(task=>({
    taskText : task.taskLabel.innerHTML,
    checked:task.checkbox.checked
   }));

  localStorage.setItem("tasks",JSON.stringify(data));
     
}


export function getDataFromLocalStorage(){
    let getData = JSON.parse(localStorage.getItem("tasks")) || [];
    getData.forEach(task=>{
        const create = createElements(task.taskText);
        const checkbox = create.checkbox;
        checkbox.checked = task.checked;
        
        markCompleteTask(checkbox,create.taskLabel);
        attachListeners(create);
    });
    
}
