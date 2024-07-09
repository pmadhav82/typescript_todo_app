import TaskItem from "../model/TaskItem";
import TaskListController from "../controller/TaskListController";
interface DOMList {
  clear(): void;
  render(allTask: TaskItem[]): void;
}

export default class HTMLTaskListView implements DOMList {
  private ul: HTMLUListElement;
  private taskListController: TaskListController;
  constructor(taskListController: TaskListController) {
    this.ul = document.getElementById("taskList") as HTMLUListElement;
    this.taskListController = taskListController;

    if (!this.ul)
      throw new Error("Could not find html ul element in html document.");
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  private createTaskListElement(task: TaskItem): HTMLLIElement {
    const li = document.createElement("li") as HTMLLIElement;
    li.className = "list-group-item d-flex gap-3 align-items-center";
    li.dataset.taskId = task.id;

    const checkBox = this.createCheckBox(task);
    const label = this.createLabel(task);
    const editTaskInput = this.createEditTaskInput();
    const [saveButton, editButton] = this.createEditAndSaveButton(
      editTaskInput,
      label,
      task
    );
    const deleteButton = this.createDeleteButton(task);

    li.append(
      checkBox,
      editTaskInput,
      label,
      editButton,
      saveButton,
      deleteButton
    );
    return li;
  }

  private createCheckBox(task: TaskItem): HTMLInputElement {
    const checkBox = document.createElement("input") as HTMLInputElement;
    checkBox.type = "checkbox";
    checkBox.checked = task.completed;
    checkBox.addEventListener("change", () => {
      this.taskListController.toggleTaskChange(task.id);
    });
    return checkBox;
  }

  private createEditTaskInput(): HTMLInputElement {
    /// input field to edit task
    const editTaskInput = document.createElement("input") as HTMLInputElement;
    editTaskInput.hidden = true;
    editTaskInput.type = "text";
    editTaskInput.className = "form-control";
    return editTaskInput;
  }

  private createLabel(task: TaskItem): HTMLLabelElement {
    const label = document.createElement("label") as HTMLLabelElement;
    label.htmlFor = task.id;
    label.textContent = task.task;
    return label;
  }

  private createEditAndSaveButton(
    editTaskInput: HTMLInputElement,
    label: HTMLLabelElement,
    task: TaskItem
  ): HTMLButtonElement[] {
    const saveButton = document.createElement("button") as HTMLButtonElement;
    saveButton.hidden = true;
    saveButton.className = "btn btn-warning btn-sm";
    saveButton.textContent = "Save";

    const editButton = document.createElement("button") as HTMLButtonElement;
    editButton.className = "btn btn-success btn-sm";
    editButton.textContent = "Edit";

    saveButton.addEventListener("click", () => {
      const updatedTaskText = editTaskInput.value;
      task.task = updatedTaskText;
      this.taskListController.editTask(task.id, updatedTaskText);
      saveButton.hidden = true;
      editButton.hidden = false;
      editTaskInput.hidden = true;
      this.render(this.taskListController.getTaskList());
    });

    editButton.addEventListener("click", () => {
      saveButton.hidden = false;
      editTaskInput.hidden = false;
      editTaskInput.value = task.task;
      label.innerText = "";
      editButton.hidden = true;
    });

    return [saveButton, editButton];
  }

  private createDeleteButton(task: TaskItem): HTMLButtonElement {
    const deleteButton = document.createElement("button") as HTMLButtonElement;
    deleteButton.className = "btn btn-primary btn-sm";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      this.taskListController.deleteTask(task.id);
      this.render(this.taskListController.getTaskList());
    });
    return deleteButton;
  }

  render(allTask: TaskItem[]): void {
    this.clear();

    allTask.forEach((task) => {
      const li = this.createTaskListElement(task);
      this.ul.append(li);
    });
  }
}
