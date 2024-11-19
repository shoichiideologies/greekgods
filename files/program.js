document.getElementById('edit-button').addEventListener('click', function() {
    toggleEditMode(true);
});

document.getElementById('save-button').addEventListener('click', function() {
    toggleEditMode(false);
});

function toggleEditMode(editMode) {
    const table = document.querySelector('.exercise-box table tbody');
    const rows = table.querySelectorAll('tr');

    if (editMode) {
        rows.forEach(row => {
            row.querySelectorAll('td').forEach(cell => {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = cell.textContent;
                cell.innerHTML = '';
                cell.appendChild(input);
            });
        });
        document.getElementById('edit-button').style.display = 'none';
        document.getElementById('save-button').style.display = 'inline-block';
    } else {
        rows.forEach(row => {
            row.querySelectorAll('td').forEach(cell => {
                const input = cell.querySelector('input');
                cell.textContent = input.value;
            });
        });
        document.getElementById('edit-button').style.display = 'inline-block';
        document.getElementById('save-button').style.display = 'none';
    }
}