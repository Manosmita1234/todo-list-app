import { elements } from "./dom.js";

export function createDropdownmenu(){
    const existing = document.querySelector(".dropdownMenu");
    if(existing){
        existing.remove();
        return;
    }

   const menu = document.createElement("div");
   menu.className = "dropdownMenu";

   const high = document.createElement("div");
   high.className = "high";
   high.textContent = "high";

   const medium = document.createElement("div");
   medium.className = "medium";
   medium.textContent = "medium";

   const low = document.createElement("div");
   low.className = "low";
   low.textContent = "low";

   elements.priorityDiv.appendChild(menu);
   menu.appendChild(high);
   menu.appendChild(medium);
   menu.appendChild(low);
}

