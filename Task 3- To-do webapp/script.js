document.addEventListener('DOMContentLoaded', () => {
  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const pendingTasks = document.getElementById('pending-tasks');
  const completedTasks = document.getElementById('completed-tasks');
  const deleteCompletedBtn = document.getElementById('delete-completed-btn');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function addTask(event) {
    event.preventDefault();
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
      const task = {
        name: taskName,
        completed: false,
        id: Date.now(),
      };
      tasks.push(task);
      saveTasks();
      displayTasks();
      taskInput.value = '';
    }
  }

  function displayTasks() {
    pendingTasks.innerHTML = '';
    completedTasks.innerHTML = '';

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task.name;

      if (task.completed) {
        li.classList.add('completed');
        completedTasks.appendChild(li);
      } else {
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', () => {
          task.completed = true;
          saveTasks();
          displayTasks();
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => {
          const newTaskName = prompt('Enter the new task name', task.name);
          if (newTaskName !== null && newTaskName.trim() !== '') {
            task.name = newTaskName.trim();
            saveTasks();
            displayTasks();
          }
        });

        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        pendingTasks.appendChild(li);
      }
    });

    deleteCompletedBtn.style.display = tasks.some(task => task.completed) ? 'block' : 'none';
  }

  function deleteCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    displayTasks();
  }

  taskForm.addEventListener('submit', addTask);
  deleteCompletedBtn.addEventListener('click', deleteCompletedTasks);
  displayTasks();
});
