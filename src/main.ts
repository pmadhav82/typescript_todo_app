import "bootstrap/dist/css/bootstrap.min.css";

import { v4 as uuid } from "uuid";
import TaskItem from "./model/TaskItem";
import TaskListController from "./controller/TaskListController";
import HTMLTaskListView from "./view/TaskListView";

const taskListController = new TaskListController();
const taskListView = new HTMLTaskListView(taskListController);
const todoForm = document.getElementById("todo-form") as HTMLFormElement;

const initApp = ()=>{
  const allTask =  taskListController.getTaskList();
  taskListView.render(allTask);

}


if (todoForm) {
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(todoForm);
    const todoValue = formData.get("new-todo") as string;
    if (todoValue === null || todoValue?.toString().trim() === "") return;
    const newTask = new TaskItem(uuid(), todoValue.trim());
  
    taskListController.addTask(newTask);

  initApp();

    todoForm.reset();
  });
}






// clear all tasks
const clearBtn = document.getElementById("clear-btn") as HTMLButtonElement;

clearBtn.addEventListener("click", ()=>{
  taskListController.clearTask();
  taskListView.clear();
})

// show completed task
const showCompletedTask = document.getElementById("completed-task") as HTMLButtonElement;
showCompletedTask.addEventListener("click", ()=>{
const completedTask = taskListController.getCompletedTask();
taskListView.render(completedTask);

})
//show task to complete
const showTaskToComplete = document.getElementById("task-to-complete") as HTMLButtonElement;
showTaskToComplete.addEventListener("click", ()=>{
const taskToComplete = taskListController.getPendingTask();
taskListView.render(taskToComplete);

})

// show all task
const showAllTask = document.getElementById("all-task") as HTMLButtonElement;
showAllTask.addEventListener("click", initApp)



initApp();