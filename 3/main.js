document.addEventListener('DOMContentLoaded', function () {
    loadData();
});

function addNew() {
    const form = document.querySelector('#form');
    const url = form.url;
    const name = form.name;

    const list = document.querySelector('#list');
    const item = document.createElement('li');
    item.innerHTML = `
        <a href="${url.value}" target="_blank">${name.value}</a>
        <button onclick="deleteNote(this)">Видалити</button>`;
        list.appendChild(item);
    saveData();
    form.reset();
}

function deleteNote(button) {
    const item = button.parentNode;
    item.remove();
    saveData();
}

function saveData() {
    const list = document.querySelector('#list');
    const notes = [];

    list.querySelectorAll('li').forEach(item => {
        const url = item.querySelector('a').getAttribute('href');
        const name = item.querySelector('a').innerText;
        notes.push({ url, name });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadData() {
    const list = document.querySelector('#list');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.forEach(note => {
        const item = document.createElement('li');
        item.innerHTML = `
            <a href="${note.url}" target="_blank">${note.name}</a>
            <button onclick="deleteNote(this)">Видалити</button>
        `;
        list.appendChild(item);
    });
}
document.querySelector('#btn').addEventListener('click', addNew);