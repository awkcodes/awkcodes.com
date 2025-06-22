// how many tasks can be there?
// 1000? 10000? 100000? 1000000?
let tasks = [];

const addInput = document.getElementById('add-item');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('list');
const removeBtn = document.getElementById('remove');

function renderTasks() {
    list.innerHTML = '';
    tasks.forEach((task, idx) => {
        const taskDiv = document.createElement('div');
        // Task item
        const li = document.createElement('li');
        li.textContent = task.content;
        if (task.finished) li.classList.add('ex');
        li.onclick = () => {
            task.finished = !task.finished;
            renderTasks();
        };
        taskDiv.appendChild(li);

        // Edit input (show if editing)
        if (task.editingOn) {
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = task.content;
            editInput.oninput = (e) => {
                task.content = e.target.value;
            };
            // Save on Enter or blur
            editInput.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    task.editingOn = false;
                    renderTasks();
                }
            };
            editInput.onblur = () => {
                task.editingOn = false;
                renderTasks();
            };
            taskDiv.appendChild(editInput);
        }

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'action-on';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            task.editingOn = !task.editingOn;
            renderTasks();
        };
        taskDiv.appendChild(editBtn);

        // Notes button
        const noteBtn = document.createElement('button');
        noteBtn.textContent = 'Notes';
        noteBtn.className = 'action-on';
        noteBtn.onclick = (e) => {
            e.stopPropagation();
            task.noteShowing = !task.noteShowing;
            renderTasks();
        };
        taskDiv.appendChild(noteBtn);

        // Notes popup
        if (task.noteShowing) {
            const noteDiv = document.createElement('div');
            const h2 = document.createElement('h2');
            h2.textContent = 'take your notes here';
            noteDiv.appendChild(h2);
            const textarea = document.createElement('textarea');
            textarea.rows = 4;
            textarea.cols = 50;
            textarea.value = task.noteContent;
            textarea.oninput = (e) => {
                task.noteContent = e.target.value;
            };
            noteDiv.appendChild(textarea);
            taskDiv.appendChild(noteDiv);
        }

        list.appendChild(taskDiv);
    });
}

addBtn.onclick = () => {
    const val = addInput.value.trim();
    if (val) {
        tasks.push({
            content: val,
            finished: false,
            editingOn: false,
            noteShowing: false,
            noteContent: ''
        });
        addInput.value = '';
        renderTasks();
    }
};

removeBtn.onclick = () => {
    tasks = tasks.filter(task => !task.finished);
    renderTasks();
};

// Optional: Enter key adds item
addInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addBtn.click();
});

renderTasks();
