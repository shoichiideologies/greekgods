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

document.querySelectorAll('.add-exercise').forEach(button => {
    button.addEventListener('click', function() {
        const dayId = button.dataset.day;
        addExercise(dayId);
    });
});

function toggleEditMode(dayId, editMode) {
    const dayElement = document.getElementById(dayId);
    const table = dayElement.querySelector('.exercise-box table tbody');
    const rows = table.querySelectorAll('tr');
    const addExerciseButton = dayElement.querySelector('.add-exercise');

    if (editMode) {
        rows.forEach(row => {
            row.querySelectorAll('td').forEach((cell, index) => {
                if (index < 2) { // Don't convert the "Remove" button cell
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = cell.textContent;
                    cell.innerHTML = '';
                    cell.appendChild(input);
                }
            });
            // Add remove button if in edit mode
            if (!row.querySelector('.remove-exercise')) {
                const removeButton = document.createElement('input');
                removeButton.type = 'button';
                removeButton.value = 'Remove';
                removeButton.className = 'remove-exercise';
                removeButton.addEventListener('click', function() {
                    row.remove();
                });
                const removeCell = document.createElement('td');
                removeCell.appendChild(removeButton);
                row.appendChild(removeCell);
            }
        });
        dayElement.querySelector(`#edit-${dayId}`).style.display = 'none';
        dayElement.querySelector(`#save-${dayId}`).style.display = 'inline-block';
        addExerciseButton.style.display = 'inline-block';
    } else {
        rows.forEach(row => {
            row.querySelectorAll('td').forEach((cell, index) => {
                if (index < 2) { // Don't convert the "Remove" button cell
                    const input = cell.querySelector('input');
                    cell.textContent = input.value;
                }
            });
            // Remove the last cell which contains the "Remove" button
            const removeButton = row.querySelector('.remove-exercise');
            if (removeButton) {
                row.removeChild(removeButton.parentNode);
            }
        });
        dayElement.querySelector(`#edit-${dayId}`).style.display = 'inline-block';
        dayElement.querySelector(`#save-${dayId}`).style.display = 'none';
        addExerciseButton.style.display = 'none';
    }
}

function addExercise(dayId) {
    const dayElement = document.getElementById(dayId);
    const tableBody = dayElement.querySelector('.exercise-box table tbody');
    const newRow = document.createElement('tr');

    const exerciseCell = document.createElement('td');
    const exerciseInput = document.createElement('input');
    exerciseInput.type = 'text';
    exerciseInput.value = 'New Exercise';
    exerciseCell.appendChild(exerciseInput);

    const statusCell = document.createElement('td');
    const statusInput = document.createElement('input');
    statusInput.type = 'text';
    statusInput.value = 'N/A';
    statusCell.appendChild(statusInput);

    newRow.appendChild(exerciseCell);
    newRow.appendChild(statusCell);

    // Add remove button
    const removeButton = document.createElement('input');
    removeButton.type = 'button';
    removeButton.value = 'Remove';
    removeButton.className = 'remove-exercise';
    removeButton.addEventListener('click', function() {
        newRow.remove();
    });
    const removeCell = document.createElement('td');
    removeCell.appendChild(removeButton);
    newRow.appendChild(removeCell);

    tableBody.appendChild(newRow);
}
