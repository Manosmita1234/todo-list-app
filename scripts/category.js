import { elements } from "./dom.js";

export function createCategoryMenu(){
    let existing = document.querySelector(".categoryMenuDiv");
    if(existing){
        existing.remove();
        return;
    }
    const categoryMenuDiv = document.createElement("div");
    categoryMenuDiv.className = "categoryMenuDiv";

    const personal = document.createElement("div");
    personal.textContent = "personal";

    const work = document.createElement("div");
    work.textContent = "work";

    const shopping = document.createElement("div");
    shopping.textContent = "shopping";

    const health = document.createElement("div");
    health.textContent = "health";

    const learning = document.createElement("div");
    learning.textContent = "learning";

    

    elements.categoryDiv.appendChild(categoryMenuDiv);
    categoryMenuDiv.appendChild(personal);
    categoryMenuDiv.appendChild(work);
    categoryMenuDiv.appendChild(shopping);
    categoryMenuDiv.appendChild(health);
    categoryMenuDiv.appendChild(learning);

    personal.addEventListener("click",()=>{
        elements.categoryText.textContent = "personal";
    });

    work.addEventListener("click",()=>{
        elements.categoryText.textContent = "work";
    });

    shopping.addEventListener("click",()=>{
        elements.categoryText.textContent = "shopping";
    });

    health.addEventListener("click",()=>{
        elements.categoryText.textContent = "health";
    });

    learning.addEventListener("click",()=>{
        elements.categoryText.textContent = "learning";
    });
}

export function createCategorySpan(){
    const categorySpan = document.createElement("span");
    categorySpan.className = "categorySpan";

    let categoryValue = elements.categoryText.textContent;
    const{type, backgroundColor, textcolor} = categoryStyle(categoryValue);

    categorySpan.textContent = type;
    categorySpan.style.backgroundColor = backgroundColor;
    categorySpan.style.color = textcolor;

    return categorySpan;
}

export function categoryStyle(text){
   if(text === "work"){
    return{type: "work", backgroundColor:"#dbeafe", textColor: "#1e40af"}
   }

   if(text === "personal"){
    return{type: "personal", backgroundColor:"#ede9fe", textColor: "#5b21b6"}
   }

   if(text === "shopping"){
    return{type: "shopping", backgroundColor:"#ffedd5", textColor: "#9a3412"}
   }

   if(text === "health"){
    return{type: "health", backgroundColor:"#fce7f3", textColor: "#9d174d"}
   }

   if(text === "learning"){
    return{type: "learning", backgroundColor:"#e0e7ff", textColor: "#3730a3"}
   }

   return{type: "personal", backgroundColor:"#ede9fe", textColor: "#1e40af"}
}

