document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});
function saveData() {
    const form = document.querySelector('#form');
    const formData = new FormData(form);

    const save = document.querySelector('#info');
    save.innerHTML = '';

    formData.forEach((value, key) => {
        localStorage.setItem(key, value);
        save.innerHTML += `<p>${key}: ${value}</p>`;
    });

    form.reset();
}

function loadData() {
    const save = document.getElementById('savedData');
    save.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        save.innerHTML += `<p>${key}: ${value}</p>`;
    }
}

document.querySelector('#btn').addEventListener('click', saveData);


