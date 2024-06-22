import AllTask from "../model/AllTask";


interface DOMList{
    ul: HTMLUListElement,
    render(allTask: AllTask):void,
    clear():void
}


export default class ListTemplete implements DOMList{

    ul: HTMLUListElement;
static instance: ListTemplete = new ListTemplete();
private constructor(){
this.ul = document.getElementById("taskList") as HTMLUListElement;

}

clear(): void {
    this.ul.innerHTML = ""
}


render(allTask: AllTask): void {
    this.clear();

allTask.tasks.forEach(task=>{


    const li = document.createElement("li") as HTMLLIElement;
li.className = "list-group-item d-flex gap-3 align-items-center";


     const checkBox = document.createElement("input") as HTMLInputElement;
     checkBox.id = task.id;
     checkBox.type = "checkbox";
checkBox.checked = task.completed;
     li.append(checkBox);


     checkBox.addEventListener("change", ()=>{
        task.completed = !task.completed;
        allTask.save();
     })



     const label = document.createElement("label") as HTMLLabelElement;
     label.htmlFor = task.id;
     label.textContent = task.task;
     li.append(label);


     const deleteButton = document.createElement("button") as HTMLButtonElement;
     deleteButton.className = "btn btn-primary";
     deleteButton.textContent = "X"
li.append(deleteButton);

deleteButton.addEventListener("click", ()=>{
    allTask.removeTask(task.id);
    this.render(allTask);
})
this.ul.append(li);

})
}

}