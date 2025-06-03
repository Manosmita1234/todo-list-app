import { elements } from "./dom.js";
import { allTasksArray } from "./tasks.js";

export function filterTask(){
    let existing = document.querySelector(".filterTaskDiv");
    if(existing){
        existing.remove();
        return;
    }
    const filterTaskDiv = document.createElement("div");
    filterTaskDiv.className = "filterTaskDiv";

    const allTasks = document.createElement("button");
    allTasks.textContent = "All Tasks"

    let pendingTasks = document.createElement("button");
    pendingTasks.textContent = "Pending";

    let completedtasks = document.createElement("button");
    completedtasks.textContent = "Completed";

    elements.filterTaskButton.appendChild(filterTaskDiv);
    filterTaskDiv.appendChild(allTasks);
    filterTaskDiv.appendChild(pendingTasks);
    filterTaskDiv.appendChild(completedtasks);

    allTasks.addEventListener("click",showAllTasks);
    pendingTasks.addEventListener("click",filterPendingTasks)
    completedtasks.addEventListener("click",filterCompletedTasks);


}

function filterCompletedTasks(){
  
    allTasksArray.forEach(tasks=>{
       let completedtasks = tasks.checkbox.checked;
       tasks.taskContainer.style.display = completedtasks ? "flex":"none";
    })
}

function showAllTasks(){
    allTasksArray.forEach(tasks=>{
        tasks.taskContainer.style.display = "flex";
    })
}

function filterPendingTasks(){
    allTasksArray.forEach(tasks=>{
        let checked = tasks.checkbox.checked;
        tasks.taskContainer.style.display = !checked ? "flex" : "none";
    })
}