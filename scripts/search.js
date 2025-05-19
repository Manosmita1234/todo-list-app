
import { allTasksArray} from './tasks.js';
 
export function searchingTask(searchInput){
    let searchTaskInput = searchInput.toLowerCase();
    
    allTasksArray.forEach(task=>{
        let existingTask = task.taskLabel.innerText.toLowerCase();
        task.taskContainer.style.display = existingTask.includes(searchTaskInput)? "flex" : "none";
    })


}
    
