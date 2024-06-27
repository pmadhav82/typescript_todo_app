import TaskItem from "./TaskItem"


interface AllTask{
    tasks: TaskItem[],
    load(): void,
    save(): void,
    clearTask(): void,
    addTask(taskObj: TaskItem): void,
    removeTask(id: string): void,
   editTask(id: string, updatedTaskText:string): void
}

export default class TaskList implements AllTask{
static instance: TaskList = new TaskList();
    private constructor(private _tasks: TaskItem[]= []){};

get tasks(): TaskItem[]{
    return this._tasks;
}

load(): void {
    const storedTasks: string | null = localStorage.getItem("myTodo");
    if(typeof storedTasks !== "string") return

    const parsedTaskList: {_id:string, _task:string, _completed:boolean}[]= JSON.parse(storedTasks);
    parsedTaskList.forEach(taskObj=>{
        const newTaskList = new TaskItem(taskObj._id, taskObj._task, taskObj._completed);

        TaskList.instance.addTask(newTaskList);
    })
}


save(): void {
    localStorage.setItem("myTodo", JSON.stringify(this._tasks));
}

clearTask(): void {

this._tasks = [];
localStorage.removeItem("myTodo");
}


addTask(taskObj: TaskItem): void {
    this._tasks.push(taskObj);
    this.save();
}

removeTask(id: string): void {
    this._tasks = this._tasks.filter(task=> task.id !== id);
    this.save()
}

editTask(id: string, updatedTaskText: string ): void {
    if(updatedTaskText.trim() === "") return
   this._tasks = this._tasks.map(task=>
     task.id === id ? new TaskItem(task.id, updatedTaskText, task.completed): task);

   this.save()

    }
}
