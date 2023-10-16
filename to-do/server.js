const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const tasksFile = 'tasks.json';
let tasks = [];
try {
  const data = fs.readFileSync(tasksFile, 'utf8');
  tasks = JSON.parse(data);
} catch (err) {
    console.log(err);
}
function saveTasks() {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2), 'utf8');
}
function listTasks() {
  console.log('To-Do List:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task}`);
  });
}
function addTask(taskDescription) {
  tasks.push(taskDescription);
  saveTasks();
  console.log(`Task "${taskDescription}" added.`);
}
function deleteTask(taskIndex) {
  if (taskIndex >= 0 && taskIndex < tasks.length) {
    const deletedTask = tasks.splice(taskIndex, 1);
    saveTasks();
    console.log(`Task "${deletedTask[0]}" deleted.`);
  } else {
    console.log('Invalid task index.');
  }
}

function askForAction() {
  console.log('\nChoose an action:');
  console.log('1. Add Task');
  console.log('2. Delete Task');
  console.log('3. List Tasks');
  console.log('4. Exit');

  rl.question('Enter the number of your choice: ', (choice) => {
    switch (choice) {
      case '1':
        rl.question('Enter task description: ', (taskDescription) => {
          addTask(taskDescription);
          askForAction();
        });
        break;
      case '2':
        listTasks();
        rl.question('Enter the task number to delete: ', (taskNumber) => {
          const taskIndex = parseInt(taskNumber) - 1;
          deleteTask(taskIndex);
          askForAction();
        });
        break;
      case '3':
        listTasks();
        askForAction();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please enter a valid number.');
        askForAction();
    }
  });
}

console.log('Welcome to the To-Do List App!');
askForAction();
rl.on('close', () => {
  console.log('Exiting the To-Do List App.');
  process.exit(0);
});