let taskList = [],
    listContainer = document.getElementById("incomplete-task"),
    newDate = document.getElementById("new-date"),
    newName = document.getElementById("new-name");

function addItemToList(name, date, checked) {
    taskList.push({
        name: name,
        date: date,
        checked: checked
    });
    localStorage.setItem('savedList', JSON.stringify(taskList));
}

function printList() {
    for (let i = 0; i < taskList.length; i++) {
        printItem(taskList[i].name, taskList[i].date, taskList[i].checked, i);
    }
}

function printItem(name, date, checked, index) {
    listContainer.innerHTML += '<div  id="task-' + index + '" class="' +
        (checked ? 'style-item checked-row' : 'style-item') + '">' +
        '<div class="check-width">' +
        '<input id="checkbox-' + index + '" onclick="checkTask()" type="checkbox" ' + (checked ? 'checked' : '') + '></div>' +
        '<div class="name-width">' + name + '</div>' + '<div class="date-width">' + getFormattedDate(date) + '</div>' +
        '<div class="trash-width">' + '<img src="images/trash-can.png" + onclick="deleteItem()" id=' + index + '>' +
        '</div></div>';
}

function getFormattedDate(date) {
    let month = date.getMonth() + 1,
        day = date.getDate(),
        year = date.getFullYear();
    return day + '.' + month + '.' + year;
}

function addTask() {
    let date;
    if (newName.value && newDate.value) {
        date = new Date(Date.parse(newDate.value));
        printItem(newName.value, date, false, taskList.length);
        addItemToList(newName.value, date, false);
    } else {
        alert("Заполните поля");
    }
}

function loadSavedData() {
    let savedTaskList = JSON.parse(localStorage.getItem('savedList'));
    if (savedTaskList) {
        savedTaskList.forEach(function (item) {
            item.date = new Date(Date.parse(item.date));
        });
        taskList = savedTaskList;
    } else {
        addItemToList('Example task', new Date(), true);
    }
}

function cleaning() {
    taskList = [];
    listContainer.innerHTML = '';
    localStorage.setItem('savedList', JSON.stringify(taskList));
}

function deleteItem() {
    let id = +event.target.id;
    taskList.splice(id, 1);
    listContainer.innerHTML = '';
    printList();
}

function checkTask() {
    let input = event.target,
        id = +input.id.split('-')[1],
        checkedState = input.checked,
        taskRow = document.getElementById('task-' + id);
    if (checkedState) {
        taskRow.className = 'style-item checked-row';
    } else {
        taskRow.className = 'style-item';
    }
    taskList[id].checked = checkedState;
    localStorage.setItem('savedList', JSON.stringify(taskList));
}

loadSavedData();
printList();
