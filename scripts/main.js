import {addTask , getDataFromLocalStorage} from "./tasks.js";
import { elements } from "./dom.js";
import { searchingTask } from "./search.js";
import { handleDropDown } from "./dropDown.js";



elements.addTaskButton.addEventListener("click",addTask);

elements.inputTask.addEventListener("keydown",(event)=>{
    if(event.key === "Enter"){
        event.preventDefault();
       addTask();
    }
});

elements.searchTask.addEventListener("input",()=>{
    searchingTask(elements.searchTask.value)
});

elements.dropDownBtn.addEventListener("click",()=>{
     handleDropDown();
});

window.addEventListener("DOMContentLoaded",getDataFromLocalStorage);


const quill = new Quill('#richEditorTaskDiv', {
    theme: 'snow'
  });