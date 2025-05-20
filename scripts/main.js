import {addTask} from "./tasks.js";
import { elements } from "./dom.js";
import { searchingTask } from "./search.js";
import { handleDropDown } from "./dropDown.js";




elements.addTaskButton.addEventListener("click",addTask);

elements.taskInput.addEventListener("keydown",(event)=>{
    if(event.key === "Enter"){
       addTask();
    }
});

elements.searchTask.addEventListener("input",()=>{
    searchingTask(elements.searchTask.value)
});

elements.dropDownBtn.addEventListener("click",()=>{
     handleDropDown();
});