import "bootstrap/dist/css/bootstrap.min.css"

const todoForm = document.getElementById("todo-form") as HTMLFormElement



if(todoForm){
todoForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const formData = new FormData(todoForm);

const todoValue = formData.get("new-todo");

if(todoValue === null || todoValue?.toString().trim() === "") return

console.log(todoValue);
todoForm.reset()


})


}


