const workoutSchedules = {
    "full-body": {
        "2 day schedule": {
            "Monday": "Full",
            "Tuesday": "Rest",
            "Wednesday": "Rest",
            "Thursday": "Full",
            "Friday": "Rest",
            "Saturday": "Rest",
            "Sunday": "Rest",
        },
        "3 day schedule": {
            "Monday": "Full",
            "Tuesday": "Rest",
            "Wednesday": "Full",
            "Thursday": "Rest",
            "Friday": "Full",
            "Saturday": "Rest",
            "Sunday": "Rest",
        },
        "4 day schedule": {
            "Monday": "Full",
            "Tuesday": "Rest",
            "Wednesday": "Full",
            "Thursday": "Full",
            "Friday": "Rest",
            "Saturday": "Full",
            "Sunday": "Rest",
        },
    },
    "upper-lower": {
        "3 day schedule": {
            "Monday": "Upper",
            "Tuesday": "Rest",
            "Wednesday": "Lower",
            "Thursday": "Rest",
            "Friday": "Upper",
            "Saturday": "Rest",
            "Sunday": "Rest",
        },
        "4 day schedule": {
            "Monday": "Upper",
            "Tuesday": "Lower",
            "Wednesday": "Rest",
            "Thursday": "Upper",
            "Friday": "Lower",
            "Saturday": "Rest",
            "Sunday": "Rest",
        },
        "5 day schedule": {
            "Monday": "Upper",
            "Tuesday": "Lower",
            "Wednesday": "Rest",
            "Thursday": "Upper",
            "Friday": "Lower",
            "Saturday": "Upper",
            "Sunday": "Rest",
        },
    },
    "push-pull-legs": {
        "3 day schedule": {
            "Monday": "Push",
            "Tuesday": "Rest",
            "Wednesday": "Pull",
            "Thursday": "Rest",
            "Friday": "Legs",
            "Saturday": "Rest",
            "Sunday": "Rest",
        },
        "4 day schedule": {
            "Monday": "Push",
            "Tuesday": "Pull",
            "Wednesday": "Rest",
            "Thursday": "Legs",
            "Friday": "Push",
            "Saturday": "Rest",
            "Sunday": "Rest",
        },
        "6 day schedule": {
            "Monday": "Push",
            "Tuesday": "Pull",
            "Wednesday": "Legs",
            "Thursday": "Push",
            "Friday": "Pull",
            "Saturday": "Legs",
            "Sunday": "Rest",
        },
    },
    "push-pull": {
        "3 day schedule": {
            "Monday": "Push",
            "Tuesday": "Rest",
            "Wednesday": "Pull",
            "Thursday": "Rest",
            "Friday": "Push",
            "Saturday": "Rest",
            "Sunday": "Rest",
        },
        "4 day schedule": {
            "Monday": "Push",
            "Tuesday": "Pull",
            "Wednesday": "Rest",
            "Thursday": "Push",
            "Friday": "Pull",
            "Saturday": "Rest",
            "Sunday": "Rest",
        },
    },
    "bro-split": {
        "5 Day Body Part Split": {
            "Monday": "Chest",
            "Tuesday": "Back",
            "Wednesday": "Legs",
            "Thursday": "Shoulders",
            "Friday": "Arms & Abs",
            "Saturday": "Rest",
            "Sunday": "Rest",
        },
        "6 Day Body Part Split": {
            "Monday": "Chest",
            "Tuesday": "Back",
            "Wednesday": "Legs",
            "Thursday": "Shoulders",
            "Friday": "Arms",
            "Saturday": "Abs",
            "Sunday": "Rest",
        },
    },
};

// Populate the days dropdown when a workout split is selected
document.getElementById("workout-splits").addEventListener("change", function () {
    const splitType = this.value;
    const daysDropdown = document.getElementById("workout-splits-options");
    daysDropdown.innerHTML = '<option value="" disabled selected>Select Days</option>';

    if (workoutSchedules[splitType]) {
        Object.keys(workoutSchedules[splitType]).forEach(schedule => {
            const option = document.createElement("option");
            option.value = schedule;
            option.textContent = schedule;
            daysDropdown.appendChild(option);
        });
    }
});

// Display workout plan when both dropdowns are selected
document.getElementById("workout-splits-options").addEventListener("change", function () {
    const splitType = document.getElementById("workout-splits").value;
    const selectedSchedule = this.value;
    const schedule = workoutSchedules[splitType][selectedSchedule];

    if (schedule) {
        Object.entries(schedule).forEach(([day, workout]) => {
            const dayElement = document.getElementById(day.toLowerCase());
            if (dayElement) {
                const splitName = dayElement.querySelector(".split-name");
                splitName.textContent = workout; // Update the split name for the day
            }
        });
    }
});


document.querySelectorAll('.add').forEach(button => {
    button.addEventListener('click', function (event) {
        const form = document.querySelector('.add-workout');
        const buttonRect = button.getBoundingClientRect();

        // Show the form temporarily to calculate its height
        form.style.display = 'block';

        // Position the form above the clicked button
        const formHeight = form.offsetHeight; // Calculate visible height
        form.style.left = `${buttonRect.left}px`;
        form.style.top = `${buttonRect.top + window.scrollY - formHeight}px`;

        // Optional: Adjust position based on the cursor (event.pageX, event.pageY)
        const cursorY = event.pageY;
        form.style.top = `${cursorY - formHeight}px`;

        // Keep the form visible
        form.style.display = 'flex';
    });
});

// Optional: Hide the form when clicking outside
document.addEventListener('click', function (event) {
    const form = document.querySelector('.add-workout');
    if (!form.contains(event.target) && !event.target.classList.contains('add')) {
        form.style.display = 'none';
    }
});

// Update the add button click event to mark the button as active
document.querySelectorAll('.add').forEach((button) => {
    button.addEventListener('click', function () {
        // Mark the clicked button as active
        document.querySelectorAll('.add').forEach(btn => btn.removeAttribute('data-active'));
        this.setAttribute('data-active', 'true');
    });
});


const workoutsList = [
    "Bench Press", "Squat", "Deadlift", "Pull-Up", "Push-Up", "Overhead Press", 
    "Dumbbell Row", "Barbell Row", "Chin-Up", "Dips", "Bicep Curl", "Tricep Pushdown", 
    "Lateral Raise", "Front Raise", "Face Pull", "Plank", "Side Plank", "Russian Twist", 
    "Leg Raise", "Mountain Climber", "Burpee", "Box Jump", "Jump Squat", "Jumping Jack", 
    "High Knees", "Lunges", "Bulgarian Split Squat", "Step-Up", "Calf Raise", "Glute Bridge", 
    "Hip Thrust", "Kettlebell Swing", "Battle Ropes", "Farmer's Walk", "Treadmill Running",
    "Cycling", "Rowing Machine", "Elliptical", "Stair Climber", "Swimming", "Sprinting", 
    "Wall Sit", "Medicine Ball Slam", "Dumbbell Fly", "Chest Press (Machine)", "Incline Bench Press", 
    "Decline Bench Press", "Arnold Press", "Shrugs", "Clean and Jerk", "Snatch", "Power Clean", 
    "Hang Clean", "Barbell Curl", "Preacher Curl", "Concentration Curl", "Hammer Curl", "Reverse Curl", 
    "Skull Crusher", "Close-Grip Bench Press", "Overhead Tricep Extension", "Dumbbell Kickbacks", 
    "Cable Fly", "Pec Deck", "Cable Crossover", "Ab Wheel Rollout", "Hanging Leg Raise", "Side Crunch", 
    "V-Up", "Bicycle Crunch", "Superman Exercise", "Dead Bug", "Reverse Crunch", "Standing Calf Raise", 
    "Seated Calf Raise", "Good Morning", "Romanian Deadlift", "Sumo Deadlift", "Hip Abduction (Machine)",
    "Hip Adduction (Machine)", "Side Lunge", "Band Pull Apart", "Resistance Band Squat", "Resistance Band Row",
    "Resistance Band Deadlift", "Sled Push", "Sled Pull", "Turkish Get-Up", "Single-Leg Deadlift", 
    "One-Arm Dumbbell Snatch", "Sandbag Carry", "Suitcase Carry", "Zercher Squat", "Jefferson Curl",
    "Spiderman Push-Up", "Archer Push-Up", "Clapping Push-Up", "Pike Push-Up", "Diamond Push-Up",
    "Incline Push-Up", "Decline Push-Up", "Weighted Pull-Up", "Assisted Pull-Up", "Weighted Dip",
    "Assisted Dip", "Hollow Body Hold", "Handstand Hold", "Handstand Push-Up", "L-Sit", "Muscle-Up",
    "Pistol Squat", "Nordic Curl", "GHD Sit-Up", "Sissy Squat", "Rope Climb", "Monkey Bars", "Front Lever",
    "Back Lever", "Planche Hold", "Human Flag", "Archer Row", "Landmine Press", "Landmine Row", 
    "Landmine Squat", "Landmine Deadlift", "Cable Lateral Raise", "Cable Front Raise", "Cable Row",
    "Lat Pulldown", "Seated Row (Machine)", "Chest-Supported Row", "T-Bar Row", "Trap Bar Deadlift", 
    "Hex Bar Deadlift", "Weighted Step-Up", "Weighted Carry", "Weighted Plank", "Medicine Ball Twist", 
    "Medicine Ball Wall Throw", "Dumbbell Snatch", "Dumbbell Swing", "Dumbbell Clean and Press", 
    "Barbell Front Squat", "Barbell Zercher Squat", "Barbell Hack Squat", "Barbell Split Squat", 
    "Barbell Overhead Squat", "Plyometric Push-Up", "Plyometric Lunge", "Broad Jump", "Reverse Lunge", 
    "Goblet Squat", "Suitcase Deadlift", "Dumbbell Deadlift", "Dumbbell Bulgarian Split Squat", 
    "Stability Ball Crunch", "Stability Ball Pike", "Stability Ball Rollout", "Stability Ball Hamstring Curl", 
    "TRX Row", "TRX Push-Up", "TRX Lunge", "TRX Plank", "TRX Fallout", "Aqua Jogging", "Weighted Russian Twist", 
    "Cable Woodchopper", "Sledgehammer Swing", "Tire Flip", "Log Press", "Atlas Stone Lift", "Keg Toss",
    "Weighted Jump Squat", "Side Step", "Ladder Drill", "Agility Cone Drill", "Shadow Boxing", 
    "Speed Bag Punching", "Heavy Bag Punching", "Mitt Work", "Sparring", "Clean Pull", "High Pull", 
    "Pendlay Row", "Snatch Grip Deadlift", "Overhead Squat", "Farmer’s Walk with Dumbbells", 
    "Incline Dumbbell Press", "Dumbbell Pullover", "Dumbbell Split Press", "Reverse Fly", "Rear Delt Fly", 
    "Dumbbell Shrug", "Lying Leg Curl (Machine)", "Standing Leg Curl (Machine)", "Leg Press (Machine)", 
    "Hack Squat (Machine)", "Seated Leg Extension", "Seated Chest Press", "Upright Row"
];

document.getElementById('workout-name').addEventListener('input', function() {
    const input = this.value.toLowerCase();
    const suggestionsContainer = document.querySelector('.autocomplete-suggestions');
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions

    if (input) {
        // Filter workouts based on the input value
        const filteredWorkouts = workoutsList.filter(workout => workout.toLowerCase().startsWith(input));

        filteredWorkouts.forEach(workout => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.textContent = workout;
            suggestionsContainer.appendChild(suggestionDiv);

            suggestionDiv.addEventListener('click', function() {
                document.getElementById('workout-name').value = workout;
                suggestionsContainer.innerHTML = ''; // Clear suggestions after selection
            });
        });

        if (filteredWorkouts.length > 0) {
            suggestionsContainer.style.display = 'block'; // Show suggestions
        } else {
            suggestionsContainer.style.display = 'none'; // Hide suggestions if no match
        }
    } else {
        suggestionsContainer.style.display = 'none'; // Hide suggestions if input is empty
    }
});

document.getElementById('workout-name').addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        const suggestions = document.querySelectorAll('.autocomplete-suggestions div');
        if (suggestions.length > 0) {
            this.value = suggestions[0].textContent; // Auto-complete with first suggestion
            document.querySelector('.autocomplete-suggestions').innerHTML = ''; // Clear suggestions
            e.preventDefault(); // Prevent the default tab behavior
        }
    }
});

// Prevent the form from hiding during typing
document.querySelector('.add-workout').addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent form from hiding when clicking inside it
});

// Close the suggestions list if the user clicks outside the form
document.addEventListener('click', function(event) {
    const suggestionsContainer = document.querySelector('.autocomplete-suggestions');
    const formContainer = document.querySelector('.add-workout');
    if (!formContainer.contains(event.target) && !suggestionsContainer.contains(event.target)) {
        suggestionsContainer.innerHTML = ''; // Clear suggestions
        suggestionsContainer.style.display = 'none'; // Hide suggestions
    }
});

document.querySelectorAll('.split-name').forEach(splitName => {
    splitName.addEventListener('click', function () {
        // Get all workouts-div containers within the parent main-days container
        const mainDaysContainer = this.closest('.main-days');
        const workoutsDivs = mainDaysContainer.querySelectorAll('.workouts-div');

        if (!workoutsDivs.length) {
            alert('No workouts available to edit.');
            return;
        }

        // Check if the workouts-div containers are currently editable
        const isEditable = workoutsDivs[0].classList.contains('editable');

        // Toggle edit state
        workoutsDivs.forEach(workoutDiv => {
            const inputs = workoutDiv.querySelectorAll('input');

            if (isEditable) {
                // Make the inputs read-only and reset div border
                inputs.forEach(input => {
                    input.setAttribute('readonly', true);
                    input.style.border = '1px solid white'; // Reset input border
                });
                workoutDiv.classList.remove('editable'); // Remove editable state
                workoutDiv.style.border = '1px solid white'; // Reset workout-div border
            } else {
                // Make the inputs editable and set div border
                inputs.forEach(input => {
                    input.removeAttribute('readonly');
                    input.style.border = '1px solid white'; // Reset input border
                });
                workoutDiv.classList.add('editable'); // Add editable state
                workoutDiv.style.border = '1px solid #182b59'; // Highlight workout-div border
            }
        });

        // Optional: Indicate state change in split-name (e.g., change icon or text color)
        if (isEditable) {
            this.style.color = ''; // Reset style when not editable
        } else {
            this.style.color = 'green'; // Example: Highlight when editable
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const mainContainer = document.querySelector('.main-container');
    const workoutSplits = document.getElementById('workout-splits');
    const workoutSplitsOptions = document.getElementById('workout-splits-options');
    const splitNames = document.querySelectorAll('.split-name');

    // Function to disable the main-container and its children
    function disableMainContainer() {
        mainContainer.style.pointerEvents = 'none'; // Disable interaction for main-container and children
        mainContainer.style.opacity = '0.5'; // Make it visually disabled
        // Ensure all buttons within .main-container are disabled
        const buttons = mainContainer.querySelectorAll('button');
        buttons.forEach(button => {
            button.disabled = true; // Explicitly disable buttons
        });
    }

    // Function to enable the main-container and its children
    function enableMainContainer() {
        mainContainer.style.pointerEvents = 'auto'; // Enable interaction for main-container and children
        mainContainer.style.opacity = '1'; // Reset to fully visible
        // Ensure all buttons within .main-container are enabled
        const buttons = mainContainer.querySelectorAll('button');
        buttons.forEach(button => {
            button.disabled = false; // Explicitly enable buttons
        });
    }

    // Function to reset split names
    function resetSplitNames() {
        splitNames.forEach(splitName => {
            splitName.textContent = ''; // Clear the split name
            const mainDaysContainer = splitName.closest('.main-days');
            if (mainDaysContainer) {
                mainDaysContainer.style.pointerEvents = 'auto'; // Enable interaction
                mainDaysContainer.style.opacity = '1'; // Reset opacity
            }
        });
    }

    // Function to remove all children of all the .split containers
    function clearSplits() {
        const splitContainers = document.querySelectorAll('.workouts');
        splitContainers.forEach(container => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        });
    }

    // Add event listener to handle workout-splits changes
    workoutSplits.addEventListener('change', function () {
        workoutSplitsOptions.value = ''; // Reset .workout-splits-options value
        resetSplitNames(); // Reset all split names
        disableMainContainer(); // Disable .main-container
        clearSplits(); // Remove all divs in the .split container
    });

    // Add event listener to handle workout-splits-options changes
    workoutSplitsOptions.addEventListener('change', function () {
        // Enable main-container only if both dropdowns have values
        if (workoutSplits.value && workoutSplitsOptions.value) {
            enableMainContainer(); // Enable .main-container
        } else {
            disableMainContainer(); // Keep it disabled otherwise
        }
        clearSplits(); // Remove all divs in the .split container
    });

    // Add event listener to show an alert when interacting with the disabled container
    mainContainer.addEventListener('click', function (event) {
        if (mainContainer.style.pointerEvents === 'none') {
            alert('Please select the required fields before proceeding.');
            event.stopPropagation(); // Prevent further event propagation
        }
    });

    function validateSelections() {
        if (workoutSplits.value && workoutSplitsOptions.value || workoutSplits.value === !null && workoutSplitsOptions.value === !null) {
            alert(workoutSplits.value);
            enableMainContainer(); // Enable main-container if both values are selected
        } else {
            disableMainContainer(); // Otherwise, disable main-container
        }
    }

    // Initial state: Disable main-container on page load
    // validateSelections();
    //disableMainContainer();
});

// Event listener for workout splits options changes
document.getElementById("workout-splits-options").addEventListener("change", function () {
    const splitType = document.getElementById("workout-splits").value;
    const selectedSchedule = this.value;
    const schedule = workoutSchedules[splitType][selectedSchedule];

    if (schedule) {
        Object.entries(schedule).forEach(([day, workout]) => {
            const dayElement = document.getElementById(day.toLowerCase());
            if (dayElement) {
                const splitName = dayElement.querySelector(".split-name");
                splitName.textContent = workout; // Update the split name for the day

                // Disable the .main-days parent container if split name is "Rest"
                const mainDaysContainer = dayElement.closest('.main-days');
                if (splitName.textContent === "Rest" && mainDaysContainer) {
                    mainDaysContainer.style.pointerEvents = 'none'; // Disable interaction
                    mainDaysContainer.style.opacity = '0.8'; // Make it visually disabled
                } else {
                    mainDaysContainer.style.pointerEvents = 'auto'; // Enable interaction
                    mainDaysContainer.style.opacity = '1'; // Reset opacity
                }
            }
        });
    }
});

// Function to attach delete functionality to a workout div
function attachDeleteFunctionality(workoutDiv) {
    const deleteButton = workoutDiv.querySelector('.delete');
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            workoutDiv.remove(); // Remove the div when delete is clicked
        });
    }
}

// Function to initialize the workouts functionality
function initializeWorkouts() {
    const mainDays = document.querySelectorAll('.main-days'); // All the days

    mainDays.forEach(day => {
        const splitName = day.querySelector('.split-name');
        const workoutsContainer = day.querySelector('.workouts');
        const addButton = day.querySelector('.add');

        // Toggle visibility of workouts when split-name is clicked
        splitName.addEventListener('click', () => {
            const workoutDivs = workoutsContainer.querySelectorAll('.workouts-div');
            workoutDivs.forEach(workoutDiv => {
                workoutDiv.classList.toggle('active'); // Toggle visibility
            });

            const deleteButtons = workoutsContainer.querySelectorAll('.delete');
            deleteButtons.forEach(deleteButton => {
                deleteButton.disabled = false; // Enable delete buttons
            });
        });

        // Reset state when add button is clicked
        addButton.addEventListener('click', () => {
            const workoutDivs = workoutsContainer.querySelectorAll('.workouts-div');
            workoutDivs.forEach(workoutDiv => {
                workoutDiv.classList.remove('editable');
                workoutDiv.style.border = '1px solid white';

                const inputs = workoutDiv.querySelectorAll('input');
                inputs.forEach(input => {
                    input.setAttribute('readonly', true);
                    input.style.border = '1px solid white';
                });

                const deleteButton = workoutDiv.querySelector('.delete');
                if (deleteButton) {
                    deleteButton.disabled = true;
                }
            });

            splitName.style.color = ''; // Reset split name color
        });

        // Attach delete functionality to existing workout divs
        const workoutsDivs = workoutsContainer.querySelectorAll('.workouts-div');
        workoutsDivs.forEach(attachDeleteFunctionality);
    });
}

// Function to handle adding new workouts
function handleAddWorkout(event) {
    event.preventDefault(); // Prevent form submission and page reload

    const workoutName = document.querySelector('#workout-name').value.trim();
    const workoutSets = document.querySelector('#workout-sets').value;
    const workoutReps = document.querySelector('#workout-reps').value;

    if (!workoutName || !workoutSets || !workoutReps) {
        alert('Please fill in all fields.');
        return;
    }

    const activeAddButton = document.querySelector('.add[data-active="true"]');
    const splitContainer = activeAddButton?.parentElement;
    const workoutsContainer = splitContainer.querySelector('.workouts');
    const splitNameElement = splitContainer.querySelector('.split-name');

    if (!workoutsContainer || !splitNameElement) {
        alert('No valid day selected.');
        return;
    }

    const newWorkout = document.createElement('div');
    newWorkout.classList.add('workouts-div');

    const workoutNameElement = document.createElement('input');
    workoutNameElement.classList.add('workout-name');
    workoutNameElement.setAttribute('readonly', true);
    workoutNameElement.value = workoutName;

    const numbersContainer = document.createElement('div');
    numbersContainer.classList.add('number');

    const setsElement = document.createElement('input');
    setsElement.classList.add('workout-sets');
    setsElement.setAttribute('readonly', true);
    setsElement.value = `${workoutSets} x sets`;

    const repsElement = document.createElement('input');
    repsElement.classList.add('workout-reps');
    repsElement.setAttribute('readonly', true);
    repsElement.value = `${workoutReps} x reps`;

    numbersContainer.appendChild(setsElement);
    numbersContainer.appendChild(repsElement);

    newWorkout.appendChild(workoutNameElement);
    newWorkout.appendChild(numbersContainer);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    newWorkout.appendChild(deleteButton);

    workoutsContainer.appendChild(newWorkout);

    attachDeleteFunctionality(newWorkout); // Attach delete functionality to the new workout

    document.querySelector('.add-workout').style.display = 'none';
    document.querySelector('#workout-name').value = '';
    document.querySelector('#workout-sets').value = '';
    document.querySelector('#workout-reps').value = '';
    activeAddButton.removeAttribute('data-active');
}

// // Event listener for DOMContentLoaded
// document.addEventListener('DOMContentLoaded', () => {
//     initializeWorkouts(); // Initialize workouts functionality

//     // Attach event listener to the add form button
//     document.querySelector('#form-add').addEventListener('click', handleAddWorkout);
// });

document.addEventListener('DOMContentLoaded', () => {
    // Attach event listener to the parent container for event delegation
    const mainContainer = document.querySelector('.main-container');

    mainContainer.addEventListener('click', function (event) {
        // Check if the clicked element is a delete button
        if (event.target.classList.contains('delete')) {
            event.preventDefault(); // Prevent default form submission
            const workoutDiv = event.target.closest('.workouts-div');
            if (workoutDiv) {
                workoutDiv.remove(); // Remove the workout div from the DOM
            }
        }
    });
    document.querySelector('#form-add').addEventListener('click', handleAddWorkout);


    // Initialize workouts functionality
    initializeWorkouts();
});