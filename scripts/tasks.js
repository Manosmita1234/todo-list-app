import { elements } from "./dom.js" ;
import { getDateData } from "./dateutils.js";
import { quill } from "./main.js";



export let allTasksArray = [];

export function createElements(taskText){

    let taskContainerWrapper = document.createElement("div");
    taskContainerWrapper.className = "taskContainerWrapper";

    let taskContainer = document.createElement("div");
    taskContainer.className = "taskContainer";

    let checkboxLabelContainer = document.createElement("div");
    checkboxLabelContainer.className = "checkboxLabelContainer";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";

    let taskLabel = document.createElement("label");
    taskLabel.className = "taskLabel";
    taskLabel.innerHTML = taskText;

    let editIcon = createEditIcon();
    let deleteIcon = createDeleteIcon();
    let dataSpan = createDataSpan();
    dataSpan.className = "dataSpan";

    let { editDivContainer, editTask, saveChangeIcon } = createEditDiv(taskText);



    elements.taskContainerWrapper.appendChild(taskContainer);
    taskContainer.appendChild(checkboxLabelContainer);
    taskContainer.appendChild(dataSpan);
    taskContainer.appendChild(editDivContainer);
    checkboxLabelContainer.appendChild(checkbox);
    checkboxLabelContainer.appendChild(taskLabel);


    checkboxLabelContainer.appendChild(editIcon);
    checkboxLabelContainer.appendChild(deleteIcon);

    allTasksArray.push({
        taskContainer,
        taskLabel,
        checkbox
    });

    return {taskContainer,
        deleteIcon,
        checkbox,
        taskLabel,
        dataSpan,
        editIcon,
        checkboxLabelContainer,
        editDivContainer,
        editTask,
        saveChangeIcon};
}


function createEditIcon(){
    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen-to-square";
    editIcon.style.marginLeft = "auto";
    editIcon.style.cursor = "pointer";
    return editIcon;
}

function createDeleteIcon(){
    let deleteicon = document.createElement("i");
    deleteicon.className = "fa-solid fa-trash";
    deleteicon.style.cursor = "pointer";
    deleteicon.style.padding = "5px";
    deleteicon.style.marginRight = "5px";
    return deleteicon;
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

}

function attachListeners({taskContainer,deleteIcon,checkbox,
           taskLabel,dataSpan,editIcon,checkboxLabelContainer,
           editDivContainer,saveChangeIcon,editTask}){
    
    deleteIcon.addEventListener("click",()=>{
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

    });

    checkbox.addEventListener("click",()=>{
        markCompleteTask(checkbox,taskLabel);
        storeDataToLocalStorage();
    });

    editIcon.addEventListener("click",()=>{
        checkboxLabelContainer.style.display = "none";
        dataSpan.style.display = "none";
        editDivContainer.style.display = "flex";
        editTask.focus();
    });

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

    elements.container.insertBefore(undoDiv,nextSibling);
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
