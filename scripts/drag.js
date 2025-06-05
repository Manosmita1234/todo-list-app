import { allTasksArray } from "./tasks.js";

let draggingItem = null;

export function dragItems(container){
    allTasksArray.forEach(items=>{
    items.dragicon.addEventListener("dragstart",()=>{
       draggingItem = items.Container;
       setTimeout(() => {
            items.classList.add('dragging');
        }, 0)
       console.log(draggingItem);
    })
})
}

