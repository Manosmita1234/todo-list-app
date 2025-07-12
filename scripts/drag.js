import { allTasksArray } from "./tasks.js";

let draggingItem = null;

export function dragItems(){
    allTasksArray.forEach(items=>{
        const taskContainer = items.taskContainer;
        
        taskContainer.addEventListener("dragstart",()=>{
            draggingItem = taskContainer;
            taskContainer.classList.add("dragging");
            console.log(draggingItem);

        })

        taskContainer.addEventListener("dragover",(e)=>{
         e.preventDefault();   
        });

        taskContainer.addEventListener("drop",()=>{
            const parent = taskContainer.parentNode;
            parent.insertBefore(draggingItem,taskContainer); 
         
         if (draggingItem) {
                draggingItem.classList.remove("dragging");
                draggingItem = null;
            }

        });
        
    })
    }


