const apiUrl = "http://localhost:5014/api/todo"; // Adjust this to your API URL

// Get the elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Fetch and display existing tasks
async function fetchTasks() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Network response was not ok.');
    const tasks = await response.json();
    
    todoList.innerHTML = ''; // Clear the list before displaying

    tasks.forEach(task => {
      const listItem = createListItem(task);
      todoList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Create a new ToDo task (POST request)
async function addTask(taskName) {
  const newTask = { name: taskName, isComplete: false };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    });

    if (!response.ok) throw new Error('Network response was not ok.');

    const addedTask = await response.json();
    todoList.appendChild(createListItem(addedTask));
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

// Delete a task (DELETE request)
async function deleteTask(taskId) {
  try {
    const response = await fetch(`${apiUrl}/${taskId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Network response was not ok.');

    document.getElementById(taskId).remove();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

// Mark task as completed (PUT request)
async function toggleTaskCompletion(task) {
  task.isComplete = !task.isComplete;

  try {
    await fetch(`${apiUrl}/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    fetchTasks(); // Refresh the task list
  } catch (error) {
    console.error('Error toggling task completion:', error);
  }
}

// Create a list item element for each task
function createListItem(task) {
  const listItem = document.createElement('li');
  listItem.id = task.id;

  const taskSpan = document.createElement('span');
  taskSpan.textContent = task.name;
  taskSpan.style.textDecoration = task.isComplete ? 'line-through' : 'none';

  const toggleButton = document.createElement('button');
  toggleButton.textContent = task.isComplete ? 'Undo' : 'Complete';
  toggleButton.addEventListener('click', () => toggleTaskCompletion(task));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteTask(task.id));

  listItem.appendChild(taskSpan);
  listItem.appendChild(toggleButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

// Handle form submission
todoForm.addEventListener('submit', event => {
  event.preventDefault();
  const taskName = todoInput.value.trim();
  
  if (taskName) {
    addTask(taskName);
    todoInput.value = '';
  }
});

// Fetch the tasks when the page loads
fetchTasks();
