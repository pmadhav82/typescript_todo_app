export interface ITask{
    id:string,
    task:string,
    completed: boolean

}


export default class TaskItem implements ITask{
  
    constructor(  
        private _id:string = "",
        private _task:string = "",
        private _completed:boolean,
    ){
     
    }
get id():string{
    return this._id
}

set id(id:string){
    this._id = id
}


get task():string{
    return this._task
}
set task(task:string){
    this._task = task
}


get completed():boolean{
    return this._completed
}
set completed(completed:boolean){
    this._completed = completed
}

}