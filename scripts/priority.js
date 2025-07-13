import { elements } from "./dom.js";

export function createDropdownmenu(){
    const existing = document.querySelector(".dropdownMenu");
    if(existing){
        existing.remove();
        return;
    }

   const menu = document.createElement("div");
   menu.className = "dropdownMenu";

   const low = document.createElement("div");
   low.className = "low";
   low.textContent = "low Priority";

   const high = document.createElement("div");
   high.className = "high";
   high.textContent = "high Priority";

   const medium = document.createElement("div");
   medium.className = "medium";
   medium.textContent = "medium Priority";

 

   elements.priorityDiv.appendChild(menu);
   menu.appendChild(low);
   menu.appendChild(medium);
   menu.appendChild(high);

   high.addEventListener("click",()=>{
    elements.priorityDiv.textContent = "high Priority";

   });

   medium.addEventListener("click",()=>{
    elements.priorityDiv.textContent = "medium Priority";
   })

   low.addEventListener("click",()=>{
    elements.priorityDiv.textContent = "low Priority";
   })
}

export function createPriority(){
    const pSpan = document.createElement("span");
    pSpan.className = "prioritySpan";
    pSpan.textContent = "";
    pSpan.textContent = elements.priorityDiv.textContent;
    if(pSpan.textContent ==="high"){
       pSpan.style.backgroundColor = "#ff4444";
       pSpan.style.color = "#000000"
    }

    if(pSpan.textContent ==="medium"){
       pSpan.style.backgroundColor = "#ffcc44";
       pSpan.style.color = "#000000";
    }

    if(pSpan.textContent ==="low"){
       pSpan.style.backgroundColor = "#44cc44 ";
       pSpan.style.color = "#000000";
    }
    return pSpan;
}

