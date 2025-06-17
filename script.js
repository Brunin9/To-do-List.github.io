const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

const filterAllBtn = document.getElementById('filterAll');
const filterPendingBtn = document.getElementById('filterPending');
const filterCompletedBtn = document.getElementById('filterCompleted');

let tasks = [];
let currentFilter = 'all';

window.onload = () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
};

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  let filteredTasks = tasks;
  if (currentFilter === 'pending') {
    filteredTasks = tasks.filter(task => task.status === 'pendente');
  } else if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(task => task.status === 'concluida');
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.name;

    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';

    if (task.status === 'pendente') {
      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Concluir';
      completeBtn.classList.add('delete-btn');
      completeBtn.style.background = '#4caf50';
      completeBtn.onclick = () => {
        tasks[index].status = 'concluida';
        saveTasks();
        renderTasks();
      };
      buttonContainer.appendChild(completeBtn);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    buttonContainer.appendChild(deleteBtn);
    li.appendChild(buttonContainer);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ name: taskText, status: 'pendente' });
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
  }
});

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

filterAllBtn.addEventListener('click', () => {
  currentFilter = 'all';
  renderTasks();
});
filterPendingBtn.addEventListener('click', () => {
  currentFilter = 'pending';
  renderTasks();
});
filterCompletedBtn.addEventListener('click', () => {
  currentFilter = 'completed';
  renderTasks();
});
