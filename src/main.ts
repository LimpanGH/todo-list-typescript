import { v4 as uuidV4 } from 'uuid';
console.log(uuidV4());

// ----------------------------------------------------
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

// ----------------------------------------------------
const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);
// console.log(tasks[0].completed);
// ----------------------------------------------------
form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) {
    return;
  }

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  saveTasks();

  addListItem(newTask);
  input.value = '';
});

// ----------------------------------------------------
function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'X';
  deleteBtn.classList.add('delete-btn');

  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  label.append(checkbox, task.title, deleteBtn);
  item.append(label);
  list?.append(item);
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks() {
  const tasksJSON = localStorage.getItem('TASKS');

  if (tasksJSON == null) {
    return [];
  } else {
    return JSON.parse(tasksJSON);
  }
}
