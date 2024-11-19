document.querySelectorAll('[id^=edit-]').forEach(button => {
    button.addEventListener('click', function() {
        const dayId = button.id.split('-')[1];
        toggleEditMode(dayId, true);
    });
});

document.querySelectorAll('[id^=save-]').forEach(button => {
    button.addEventListener('click', function() {
        const dayId = button.id.split('-')[1];
        toggleEditMode(dayId, false);
    });
});

function toggleEditMode(dayId, editMode) {
    const dayElement = document.getElementById(dayId);
    const table = dayElement.querySelector('.exercise-box table tbody');
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
        dayElement.querySelector(`#edit-${dayId}`).style.display = 'none';
        dayElement.querySelector(`#save-${dayId}`).style.display = 'inline-block';
    } else {
        rows.forEach(row => {
            row.querySelectorAll('td').forEach(cell => {
                const input = cell.querySelector('input');
                cell.textContent = input.value;
            });
        });
        dayElement.querySelector(`#edit-${dayId}`).style.display = 'inline-block';
        dayElement.querySelector(`#save-${dayId}`).style.display = 'none';
    }
}