import { elements } from "./dom.js" ;
import { getDateData } from "./dateutils.js";
import { quill } from "./main.js";
import { createPriority,priorityStyle } from "./priority.js";
import {categoryStyle, createCategorySpan  } from "./category.js";


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

    let taskInfoDiv = document.createElement("div");
    taskInfoDiv.className = "taskInfoDiv";
    taskInfoDiv.style.display = "flex"

    let dataSpan = createDataSpan();
    dataSpan.className = "dataSpan";
    

    let prioritySpan = createPriority();
    prioritySpan.className = "prioritySpan";

    let categorySpan = createCategorySpan();
    categorySpan.className = "categorySpan";
   
    let { editDivContainer, editTask, saveChangeIcon } = createEditDiv(taskText);

    elements.taskContainerWrapper.appendChild(taskContainer);
    taskContainer.appendChild(checkboxLabelContainer);
    taskContainer.appendChild(taskInfoDiv);
    taskInfoDiv.appendChild(dataSpan);
    taskInfoDiv.appendChild(prioritySpan);
    taskInfoDiv.appendChild(categorySpan);
    taskContainer.appendChild(editDivContainer);
    checkboxLabelContainer.appendChild(dragicon);
    checkboxLabelContainer.appendChild(checkbox);
    checkboxLabelContainer.appendChild(taskLabel);
    checkboxLabelContainer.appendChild(editDeleteButton);

    allTasksArray.push({
        taskContainer,
        taskLabel,
        checkbox,
        dragicon,
        prioritySpan,
        categorySpan
    });

    return {taskContainer,
        checkbox,
        taskLabel,
        dataSpan,
        prioritySpan,
        categorySpan,
        checkboxLabelContainer,
        editDivContainer,
        editTask,
        deleteTaskbtn,
        editTaskbtn,
        dragicon,
        saveChangeIcon,
        prioritySpan,
        categorySpan
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
 
   let taskText = quill.getText().trim();
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
           taskLabel,dataSpan,prioritySpan, categorySpan, checkboxLabelContainer,
           editDivContainer,saveChangeIcon,editTask,editTaskbtn,deleteTaskbtn}){

    checkbox.addEventListener("click",()=>{
        markCompleteTask(checkbox,taskLabel);
        storeDataToLocalStorage();
    });

    editTaskbtn.addEventListener("click",()=>{
        checkboxLabelContainer.style.display = "none";
        dataSpan.style.display = "none";
        prioritySpan.style.display = "none";
        categorySpan.style.display = "none";
        editDivContainer.style.display = "flex";
        editTask.focus();
        });


    deleteTaskbtn.addEventListener("click", () => {
    const parent = taskContainer.parentNode;
    const nextSibling = taskContainer.nextSibling;

    let deletedtaskData = {
        taskText: taskLabel.innerHTML,
        checkStatus: checkbox.checked,
        parent: parent,
        nextSibling: nextSibling
    };

    allTasksArray = allTasksArray.filter(task => task.taskContainer !== taskContainer);
    taskContainer.remove();
    storeDataToLocalStorage();

    handleUndoDiv(deletedtaskData);
});


    saveChangeIcon.addEventListener("click",()=>{
        let newTask = editTask.value;
        checkboxLabelContainer.style.display = "flex";
        dataSpan.style.display = "flex";
        prioritySpan.style.display = "flex";
        categorySpan.style.display = "flex";
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


function handleUndoDiv({ taskText, checkStatus, parent, nextSibling }) {
    let undoDiv = document.createElement("div");
    undoDiv.className = "undoDiv";
    undoDiv.textContent = "Task deleted ";

    let undoButton = document.createElement("button");
    undoButton.className = "undoButton";
    undoButton.textContent = "Undo";

    let closeIcon = document.createElement("i");
    closeIcon.className = "fa-solid fa-xmark";
    closeIcon.style.cursor = "pointer";
    closeIcon.style.marginLeft = "auto";
    closeIcon.style.marginRight = "15px";

    if (nextSibling) {
        parent.insertBefore(undoDiv, nextSibling);
    } else {
        parent.appendChild(undoDiv);
    }

    undoDiv.appendChild(undoButton);
    undoDiv.appendChild(closeIcon);

    setTimeout(() => {
        undoDiv.remove();
    }, 50000);


    undoButton.addEventListener("click", () => {
        undoDiv.remove();

        let task = createElements(taskText);
        task.checkbox.checked = checkStatus;
        markCompleteTask(task.checkbox, task.taskLabel);
        attachListeners(task);

        if (nextSibling) {
            parent.insertBefore(task.taskContainer, nextSibling);
        } else {
            parent.appendChild(task.taskContainer);
        }

        storeDataToLocalStorage();
    });

    closeIcon.addEventListener("click", () => {
        undoDiv.remove();
    });
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


export function storeDataToLocalStorage(){
   let data = allTasksArray.map(task=>({
    taskText : task.taskLabel.innerHTML,
    checked:task.checkbox.checked,
    priority:task.prioritySpan.textContent,
    category:task.categorySpan.textContent

   }));

  localStorage.setItem("tasks",JSON.stringify(data));
     
}


export function getDataFromLocalStorage(){
    let getData = JSON.parse(localStorage.getItem("tasks")) || [];
    getData.forEach(task=>{
        const create = createElements(task.taskText, task.priority, task.category);

        const checkbox = create.checkbox;
        checkbox.checked = task.checked;

        const prioritySpan = create.prioritySpan;
    
        if (prioritySpan) {
        const { backgroundColor, textColor } = priorityStyle(task.priority);
        prioritySpan.textContent = task.priority;
        prioritySpan.style.backgroundColor = backgroundColor;
        prioritySpan.style.color = textColor;
    }

    const categorySpan = create.categorySpan;
    
    if(categorySpan){
        const { backgroundColor, textColor } = categoryStyle(task.category);
        categorySpan.textContent = task.category;
        categorySpan.style.backgroundColor = backgroundColor;
        categorySpan.style.color = textColor;
    }
        
        markCompleteTask(checkbox,create.taskLabel);
        attachListeners(create);
    });
    
}