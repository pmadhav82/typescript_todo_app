import TaskItem from "./TaskItem";


interface ITaskList{
    tasks: TaskItem[],
    load(): void,
    save(): void,
    clearTask(): void,
    addTask(taskObj: TaskItem): void,
    removeTask(id: string): void
}

export default class TaskList implements ITaskList{
static instance: TaskList = new TaskList()
    private constructor(private _tasks: TaskItem[]= []){}

get tasks(): TaskItem[]{
    return this._tasks;
}

load(): void {
    const storedTasks: string | null = localStorage.getItem("myTodo");
    if(typeof storedTasks !== "string") return

    const parsedTaskList: TaskItem[] = JSON.parse(storedTasks);
    parsedTaskList.forEach(taskObj=>{
        const newTaskList = new TaskItem(taskObj.id, taskObj.task, taskObj.completed);

        TaskList.instance.addTask(newTaskList);
    })
}


save(): void {
    localStorage.setItem("myTodo", JSON.stringify(this._tasks));
}

clearTask(): void {
this._tasks = [];
this.save()
}


addTask(taskObj: TaskItem): void {
    this._tasks.push(taskObj);
    this.save();
}

removeTask(id: string): void {
    this._tasks = this._tasks.filter(task=> task.id !== id);
    this.save()
}
}