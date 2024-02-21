import { v4 as uuidV4 } from 'uuid';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>('.list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const taskContainer = document.querySelector<HTMLDivElement>('.task-container');

const deleteAllTasksButton = document.createElement('button');
deleteAllTasksButton.id = 'deleteAllTasksButton';
deleteAllTasksButton.textContent = 'Delete All Tasks';

function checkEmptyListAndHideContainer() {
  const li = document.querySelectorAll<HTMLLIElement>('li');
  const taskContainer =
    document.querySelector<HTMLDivElement>('.task-container');

  if (!li || li.length === 0) {
    taskContainer?.classList.add('hide-task-container');
  } else {
    taskContainer?.classList.remove('hide-task-container');
  }
}

deleteAllTasksButton.addEventListener('click', () => {
  deleteAllTasks();
  checkEmptyListAndHideContainer();
});

const container = document.querySelector<HTMLDivElement>('#container');
if (container) {
  container.appendChild(deleteAllTasksButton);
} else {
  console.error('Container element not found');
}

const deleteAllTasks = () => {
  if (!list) return;
  tasks = [];
  list.innerHTML = '';
  localStorage.removeItem('TASKS');
};
deleteAllTasksButton.addEventListener('click', deleteAllTasks);

let tasks: Task[] = loadTasks();

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (input?.value == '' || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value.replace(/\n/g, '<br>'),
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);

  addListItem(newTask);
  saveTasks();
  input.value = '';
});

// Adding tasks -------------------
function addListItem(task: Task) {
  taskContainer?.classList.remove('hide-task-container');
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  const titleSpan = document.createElement('span');
  titleSpan.className = 'task-title';
  titleSpan.innerHTML = task.title;
  titleSpan.contentEditable = 'false';

  titleSpan.addEventListener('input', () => {
    task.title = titleSpan.textContent || '';
    saveTasks();
  });

// Edit-button -------------------
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.className = 'editButton';
  editButton.addEventListener('click', () => {
    if (titleSpan.contentEditable === 'true') {
      titleSpan.contentEditable = 'false';
      editButton.textContent = 'Edit';
    } else {
      titleSpan.contentEditable = 'true';
      editButton.textContent = 'Save';
      titleSpan.focus();
    }
  });

  // Remove-button -------------------
  const removeButton = document.createElement('button');
  const plusSpan = document.createElement('span');
  plusSpan.textContent = '+';
  removeButton.appendChild(plusSpan);
  removeButton.className = 'remove-btn';
  removeButton.addEventListener('click', () => {
    removeTask(task.id);
    item.remove();
    checkEmptyListAndHideContainer();
  });

  label.appendChild(checkbox);
  label.appendChild(titleSpan);
  label.appendChild(editButton);
  label.appendChild(removeButton);

  label.setAttribute('for', checkbox.id);

  item.className = 'task';
  item.appendChild(label);

  list?.append(item);
}

function removeTask(id: string) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}


// Load-task
function loadTasks(): Task[] {
  const taskJson = localStorage.getItem('TASKS');
  if (taskJson == null) {
    const taskContainer =
      document.querySelector<HTMLDivElement>('.task-container');
    taskContainer?.classList.add('hide-task-container');
    return [];
  }

  const loadedTasks: Task[] = JSON.parse(taskJson);

  loadedTasks.forEach((task) => {
    addListItem(task);
  });

  return loadedTasks;
}
