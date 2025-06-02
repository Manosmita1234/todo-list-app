import { elements } from "./dom.js";

export function filterTask(){
    let existing = document.querySelector(".filterTaskDiv");
    if(existing){
        existing.remove();
        return;
    }
    const filterTaskDiv = document.createElement("div");
    filterTaskDiv.className = "filterTaskDiv";

    elements.filterTaskButton.appendChild(filterTaskDiv);

}