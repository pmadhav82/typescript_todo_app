import "bootstrap/dist/css/bootstrap.min.css"
import {v4 as uuid}  from "uuid";
import TaskList from "./model/AllTask";
import TaskItem from "./model/TaskItem";
import ListTemplete from "./templete/listTemplete";


const allTask = TaskList.instance;
const template = ListTemplete.instance;











const todoForm = document.getElementById("todo-form") as HTMLFormElement



if(todoForm){
todoForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const formData = new FormData(todoForm);

const todoValue = formData.get("new-todo") as string;

if(todoValue === null || todoValue?.toString().trim() === "") return

const newTask = new TaskItem(uuid(), todoValue.trim()) ;

allTask.addTask(newTask);
template.render(allTask);
todoForm.reset()


})


}



// clear all tasks
const clearBtn = document.getElementById("clear-btn") as HTMLButtonElement;

clearBtn.addEventListener("click",()=>{
  allTask.clearTask();
  template.clear();
})



allTask.load();
template.render(allTask);