import { v4 as uuidv4 } from 'uuid';

// Skapar en typ som heter Task och typar dess properties med typescript-typer.
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLDivElement>('.notes-section');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');
const tasks: Task[] = loadTasks(); // loadTasks will return an arryay of tasks, each task will have the the type "Task", this array of tasks will be stored in the variable called "task".
tasks.forEach(addListItem); // Loops through the array and runs the function "addListItem" on each item.

// "form" could be null, if no task has been created, thats why I need the ?.
form?.addEventListener('submit', (e) => {
  e.preventDefault();

  // Checks if the value property of the input object is null or an empty string, if it is, it stops the function.
  if (input?.value == '' || input?.value == null) {
    return;
  }

  // Creating a new "Task" object and adds it to the array stored in the variable "tasks".
  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);

  addListItem(newTask); // Function-call for "addListItem", passing the "newTask"-object as an argument.

  input.value = ''; // Clearing the inputfield so I can input another task in the input-field.
});

function addListItem(task: Task) {
  const checkbox = document.querySelector<HTMLInputElement>('.checkbox');
  const notesSection = document.querySelector<HTMLDivElement>('.notes-section');

  checkbox?.addEventListener('change', () => {
    task.completed = checkbox.checked;
    console.log(tasks);
    saveTasks();
  });

  if (checkbox !== null && checkbox !== undefined) {
    checkbox.checked = task.completed;
  }
  notesSection.append(checkbox, document.createTextNode(task.title));
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('TASKS');
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
