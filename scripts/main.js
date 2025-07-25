import {addTask, getDataFromLocalStorage,allTasksArray} from "./tasks.js";
import { elements } from "./dom.js";
import { searchingTask } from "./search.js";
import { handleDropDown } from "./dropDown.js";
import { filterTask } from "./filter.js";
import { dragItems } from "./drag.js";
import { createDropdownmenu } from "./priority.js";
import { createCategoryMenu } from "./category.js";


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

window.addEventListener("DOMContentLoaded",()=>{
  getDataFromLocalStorage();
  dragItems();
});


export const quill = new Quill('#richEditorTaskDiv', {
    theme: 'snow',
     placeholder: 'Enter task...',
    modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['clean'],
      [{ 'color': [] }, { 'background': [] }],      
    ]
  }
  });


  elements.filterTaskButton.addEventListener("click",()=>{
    filterTask();
  });

  elements.priorityDiv.addEventListener("click",()=>{
    createDropdownmenu();
  });

  elements.categoryDiv.addEventListener("click",()=>{
    createCategoryMenu();
  })