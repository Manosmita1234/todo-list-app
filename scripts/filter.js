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

    let pendingTasks = document.createElement("button");
    pendingTasks.textContent = "Pending";

    let completedtasks = document.createElement("button");
    completedtasks.textContent = "Completed";

    elements.filterTaskButton.appendChild(filterTaskDiv);
    filterTaskDiv.appendChild(pendingTasks);
    filterTaskDiv.appendChild(completedtasks);

    completedtasks.addEventListener("click",filterCompletedTasks)

}

function filterCompletedTasks(){
  
    allTasksArray.forEach(tasks=>{
       let completedtasks = tasks.checkbox.checked;
       tasks.taskContainer.style.display = completedtasks ? "flex":"none";
    })
}

