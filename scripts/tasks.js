import { elements } from "./dom.js" ;
import { getDateData } from "./dateutils.js";


export let allTasksArray = [];

export function createElements(taskText){
    let taskContainer = document.createElement("div");
    taskContainer.className = "taskContainer";

    let checkboxLabelContainer = document.createElement("div");
    checkboxLabelContainer.className = "checkboxLabelContainer";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";

    let taskLabel = document.createElement("label");
    taskLabel.className = "taskLabel";
    taskLabel.textContent = taskText;

    let editIcon = createEditIcon();
    let deleteIcon = createDeleteIcon();
    let dataSpan = createDataSpan();
    dataSpan.className = "dataSpan";

    let { editDivContainer, editTask, saveChangeIcon } = createEditDiv(taskText);

    elements.container.appendChild(taskContainer);
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
        checkbox,
        deleteIcon,
        dataSpan,
        editIcon,
        checkboxLabelContainer,
        editDivContainer,
        saveChangeIcon,
        editTask
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
    return deleteicon;
}


export function addTask(){
    let taskText = elements.taskInput.value.trim();
    if(taskText === ""){
        alert("Please Enter a task");
        return;
    }

  let task = createElements(taskText);
  attachListerners(task);

  storeDataToLocalStorage();
  elements.taskInput.value = "";
  elements.taskInput.focus();

}

function attachListerners({taskContainer,deleteIcon,checkbox,
           taskLabel,dataSpan,editIcon,checkboxLabelContainer,
           editDivContainer,saveChangeIcon,editTask}){
    
    deleteIcon.addEventListener("click",()=>{
        allTasksArray = allTasksArray.filter(task => task.taskContainer !== taskContainer);
        taskContainer.remove();
        storeDataToLocalStorage();
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
        taskLabel.textContent = newTask;
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
    taskText : task.taskLabel.textContent,
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
        attachListerners(create);
    });
    
}
