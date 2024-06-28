import AllTask from "../model/AllTask";
import TaskItem from "../model/TaskItem";


interface DOMList{
    ul: HTMLUListElement,

    render(allTask: AllTask):void,


}




export default class HTMLTodoListView implements DOMList{



static instace: HTMLTodoListView = new HTMLTodoListView();
ul: HTMLUListElement;
private constructor(){
    this.ul = document.getElementById("taskList") as HTMLUListElement;

    if(!this.ul) throw new Error("Could not find html ul element in html document.")
}



private clear(): void {
     this.ul.innerHTML = ""
}

 private createTaskListElement(task: TaskItem, allTask: AllTask): HTMLLIElement {
    
    const li = document.createElement("li") as HTMLLIElement;
li.className = "list-group-item d-flex gap-3 align-items-center";
li.dataset.taskId = task.id;


const checkBox = this.createCheckBox(task, allTask);
const label = this.createLabel(task);
const editTaskInput = this.createEditTaskInput();
const [saveButton, editButton] = this.createEditAndSaveButton(editTaskInput, label, allTask, task);
const deleteButton = this.createDeleteButton(allTask, task)

li.append(checkBox, editTaskInput, label, editButton, saveButton, deleteButton)
return li;

}

private createCheckBox(task: TaskItem, allTask: AllTask): HTMLInputElement {
    
     const checkBox = document.createElement("input") as HTMLInputElement;
     checkBox.type = "checkbox";
checkBox.checked = task.completed;
     checkBox.addEventListener("change", ()=>{
        task.completed = !task.completed;
        allTask.save();
}
     )
     return checkBox

}

private createEditTaskInput(): HTMLInputElement {
         /// input field to edit task
     const editTaskInput = document.createElement("input") as HTMLInputElement;
     editTaskInput.hidden = true;
     editTaskInput.type = "text";
     editTaskInput.className = "form-control";
     return editTaskInput
}

 private createLabel(task: TaskItem): HTMLLabelElement {
    const label = document.createElement("label") as HTMLLabelElement;
         label.htmlFor = task.id;
         label.textContent = task.task;
         return label
}




 private createEditAndSaveButton(editTaskInput: HTMLInputElement,  label: HTMLLabelElement, allTask:AllTask, task: TaskItem): HTMLButtonElement[] {
  
     const saveButton = document.createElement("button") as HTMLButtonElement;
     saveButton.hidden = true;
     saveButton.className = "btn btn-warning btn-sm";
     saveButton.textContent = "Save";
     
     const editButton = document.createElement("button") as HTMLButtonElement;
     editButton.className = "btn btn-success btn-sm";
     editButton.textContent = "Edit";
     
     
     
     saveButton.addEventListener("click", ()=>{
        const updatedTaskText = editTaskInput.value;
         allTask.editTask(task.id, updatedTaskText);
         saveButton.hidden = true;
         editButton.hidden = false;
         editTaskInput.hidden = true;
     this.render(allTask);
     })


     editButton.addEventListener("click", ()=>{
     
     saveButton.hidden = false;
     editTaskInput.hidden = false;
     editTaskInput.value = task.task;
     label.innerText = "";
     editButton.hidden = true;
         
     }) 



return [ saveButton, editButton]
     
}


private createDeleteButton(allTask: AllTask, task:TaskItem): HTMLButtonElement {



     const deleteButton = document.createElement("button") as HTMLButtonElement;
     deleteButton.className = "btn btn-primary btn-sm";
     deleteButton.textContent = "Delete"

deleteButton.addEventListener("click", ()=>{
    allTask.removeTask(task.id);
    this.render(allTask);
})
 return deleteButton

    
}




render(allTask: AllTask): void {
    
     this.clear();

 allTask.tasks.forEach(task=>{

     const li = this.createTaskListElement(task, allTask);

this.ul.append(li);
})



}


}





// export default class ListTemplete implements DOMList{

//     ul: HTMLUListElement;
// static instance: ListTemplete = new ListTemplete();
// private constructor(){
// this.ul = document.getElementById("taskList") as HTMLUListElement;

// }

// clear(): void {
//     this.ul.innerHTML = ""
// }


// render(allTask: AllTask): void {
//     this.clear();

// allTask.tasks.forEach(task=>{


//     const li = document.createElement("li") as HTMLLIElement;
// li.className = "list-group-item d-flex gap-3 align-items-center";


//      const checkBox = document.createElement("input") as HTMLInputElement;
     
//      checkBox.id = task.id;
//      checkBox.type = "checkbox";
// checkBox.checked = task.completed;
//      li.append(checkBox);


//      checkBox.addEventListener("change", ()=>{
//         task.completed = !task.completed;
//         allTask.save();
//      })

//      //input field to edit task
//      const editTaskInput = document.createElement("input") as HTMLInputElement;
//      editTaskInput.hidden = true;
//      editTaskInput.type = "text";
//      editTaskInput.className = "form-control";
//       li.append(editTaskInput);




//      const label = document.createElement("label") as HTMLLabelElement;
//      label.htmlFor = task.id;
//      label.textContent = task.task;
//      li.append(label);

     
//      const saveButton = document.createElement("button") as HTMLButtonElement;
//      saveButton.hidden = true;
//      saveButton.className = "btn btn-warning btn-sm";
//      saveButton.textContent = "Save";
//      li.append(saveButton);
     
     
     
//      saveButton.addEventListener("click", ()=>{
//         const updatedTaskText = editTaskInput.value;
//          allTask.editTask(task.id, updatedTaskText);
//          saveButton.hidden = true;
//          editButton.hidden = false;
//          editTaskInput.hidden = true;
     
//          this.render(allTask);
//      })
     
     
     
     
//      const editButton = document.createElement("button") as HTMLButtonElement;
//      editButton.className = "btn btn-success btn-sm";
//      editButton.textContent = "Edit";
//      li.append(editButton);
     
     
//      editButton.addEventListener("click", ()=>{
     
//      saveButton.hidden = false;
//      editTaskInput.hidden = false;
//      editTaskInput.value = task.task;
//      label.innerText = "";
//      editButton.hidden = true;
         
//      })



//      const deleteButton = document.createElement("button") as HTMLButtonElement;
//      deleteButton.className = "btn btn-primary btn-sm";
//      deleteButton.textContent = "Delete"
// li.append(deleteButton);

// deleteButton.addEventListener("click", ()=>{
//     allTask.removeTask(task.id);
//     this.render(allTask);
// })



// this.ul.append(li);

// })
// }

// }