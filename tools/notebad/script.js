const editor = document.getElementById('editor');
const openBtn = document.getElementById('openBtn');
const saveBtn = document.getElementById('saveBtn');
const fileInput = document.getElementById('fileInput');

// open a text file
openBtn.addEventListener('click', () => {
    fileInput.value = '';
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        editor.value = evt.target.result;
    };
    reader.readAsText(file);
});

// Save file
saveBtn.addEventListener('click', () => {
    const text = editor.value;
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'untitled.txt';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
    }, 0);
});
