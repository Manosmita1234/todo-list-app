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
    elements.priorityText.textContent = "high";

   });

   medium.addEventListener("click",()=>{
    elements.priorityText.textContent = "medium";
   })

   low.addEventListener("click",()=>{
    elements.priorityText.textContent = "low";
   })
}


export function createPriority(){
    const pSpan = document.createElement("span");
    pSpan.className = "prioritySpan";

    const priorityText = elements.priorityText.textContent;

    const {level, backgroundColor , textColor} = priorityStyle(priorityText);

    pSpan.textContent = level;
    pSpan.style.backgroundColor = backgroundColor;
    pSpan.style.color = textColor;
  
    
    return pSpan;
}


export function priorityStyle(text){
       if (text === "high") {
        return { level: "high", backgroundColor: "#fee2e2", textColor: "#991b1b" };
    }
    if (text === "medium") {
        return { level: "medium", backgroundColor: "#fefce8", textColor: "#92400e" };
    }
    if (text === "low") {
        return { level: "low", backgroundColor: "#d1fae5", textColor: "#166543" };
    }
    return { level: "low", backgroundColor: "#d1fae5", textColor: "#166543" };
}

