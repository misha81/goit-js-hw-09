document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function addTask() {
    const inp = document.querySelector('#input');
    const list = document.querySelector('#list');

    const task = inp.value;
    if (task === '') {
        alert('Ви не ввели текст!');
        return;
    }

    const elem = document.createElement('li');
    elem.innerHTML = `
        <span>${task}</span>
        <button onclick="toggleTaskStatus(this)">Виконано</button>
        <button onclick="deleteTask(this)">Видалити</button> `;

        list.appendChild(elem);
    inp.value = '';
    saveTasks();
}

function toggleTaskStatus(button) {
    const elem = button.parentNode;
    elem.classList.toggle('completed');
    saveTasks();
}

function deleteTask(button) {
    const elem = button.parentNode;
    elem.remove();
    saveTasks();
}

function saveTasks() {
    const list = document.querySelector('#list');
    const tasks = [];

    list.querySelectorAll('li').forEach(elem => {
        const task = elem.querySelector('span').innerText;
        const check = elem.classList.contains('completed');
        tasks.push({ text: task, completed: check });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const list = document.querySelector('#list');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => {
        const elem = document.createElement('li');
        elem.innerHTML = `
            <span>${task.text}</span>
            <button onclick="toggleTaskStatus(this)">Виконано</button>
            <button onclick="deleteTask(this)">Видалити</button>
        `;
        if (task.completed) {
            elem.classList.add('completed');
        }
        list.appendChild(elem);
    });
}
document.querySelector('#btn').addEventListener('click', addTask);