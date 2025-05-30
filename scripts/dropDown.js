import { elements } from "./dom.js";
import { allTasksArray,  } from "./tasks.js";

export function handleDropDown(){
    const existing = document.querySelector(".dropDownContainer");
    if(existing){
      existing.remove();
      return;
    }

    let container = document.createElement("div");
    container.className = "dropDownContainer";

    let deleteAllBtn = document.createElement("button");
    deleteAllBtn.textContent = "Delete all";

    let markAllDoneBtn = document.createElement("button");
    markAllDoneBtn.textContent = "Mark all done";

    let markAllUndoneBtn = document.createElement("button");
    markAllUndoneBtn.textContent = "Mark all undone";


    elements.dropDownDiv.appendChild(container);
    container.appendChild(deleteAllBtn);
    container.appendChild(markAllDoneBtn);
    container.appendChild(markAllUndoneBtn);
    
    deleteAllBtn.addEventListener("click",()=>{
    
        allTasksArray.forEach(tasks=>{
            tasks.taskContainer.remove();
        })
        localStorage.removeItem("tasks");
        allTasksArray.length = 0;

        deleteAllBtn.addEventListener("click",()=>{
        const existing = document.querySelector(".dropDownContainer");
        if(existing){
        existing.remove();
        return;
    }

        })  
    });

    markAllDoneBtn.addEventListener("click",()=>{
        allTasksArray.forEach(task=>{
          task.taskLabel.style.textDecoration = "line-through";
          task.checkbox.checked = true;
          task.taskLabel.style.opacity = "0.5";

         });
        markAllDoneBtn.addEventListener("click",()=>{
        const existing = document.querySelector(".dropDownContainer");
        if(existing){
        existing.remove();
        return;
    }
        });
  });
  
  markAllUndoneBtn.addEventListener("click",()=>{
    allTasksArray.forEach(task=>{
      task.taskLabel.style.textDecoration = "none";
      task.checkbox.checked = false;
      task.taskLabel.style.opacity = "1";
    })

    markAllUndoneBtn.addEventListener("click",()=>{
      const existing = document.querySelector(".dropDownContainer");
      if(existing){
        existing.remove();
        return;
      }
    })
  });

}

