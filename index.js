// Tab switching functionality
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));

    // Show selected tab content
    document.getElementById(tabName + '-tab').classList.add('active');

    // Add active class to clicked button
    const activeButton = document.querySelector(`.tab-button[onclick="switchTab('${tabName}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

// State management
const state = {
    mode: 'guc_to_american' // 'guc_to_american' or 'american_to_guc'
};

// Logic: GUC -> American
function calcPercent(grade) {
    const grades = [
        [0.7, 0.99, 100, 100],
        [1.0, 1.29, 95, 100],
        [1.3, 1.69, 87.5, 95],
        [1.7, 1.99, 82.5, 87.5],
        [2.0, 2.29, 77.5, 82.5],
        [2.3, 2.69, 72.5, 77.5],
        [2.7, 2.99, 67.5, 72.5],
        [3.0, 3.29, 62.5, 67.5],
        [3.3, 3.69, 57.5, 62.5],
        [3.7, 3.99, 52.5, 57.5],
        [4.0, 4.99, 50, 52.5],
        [5.0, 6.0, 0, 50],
    ];

    for (let i = 0; i < grades.length; i++) {
        const key = grades[i];
        if (grade >= key[0] && grade <= key[1]) {
            return ((key[1] - grade) * (key[3] - key[2])) / (key[1] - key[0]) + key[2];
        }
    }
    return -1;
}

function getGPA(percent) {
    return Math.round((percent / 100) * 4 * 100) / 100;
}

function calcGPA(gpa) {
    if (isNaN(gpa) || gpa === '') {
        return 'Please enter a valid GPA';
    }
    if (gpa < 0.7 || gpa > 6.0) {
        return 'Invalid GPA range (0.7 - 6.0)';
    }
    const percent = calcPercent(gpa);
    const americanGPA = getGPA(percent);
    return `Your American GPA is: <strong>${americanGPA}</strong>`;
}

// Logic: American -> GUC
function calcGUCGrade(americanGPA) {
    if (americanGPA < 0 || americanGPA > 4.0) return -1;

    const percent = americanGPA * 25;

    const grades = [
        [0.7, 0.99, 100, 100],
        [1.0, 1.29, 95, 100],
        [1.3, 1.69, 87.5, 95],
        [1.7, 1.99, 82.5, 87.5],
        [2.0, 2.29, 77.5, 82.5],
        [2.3, 2.69, 72.5, 77.5],
        [2.7, 2.99, 67.5, 72.5],
        [3.0, 3.29, 62.5, 67.5],
        [3.3, 3.69, 57.5, 62.5],
        [3.7, 3.99, 52.5, 57.5],
        [4.0, 4.99, 50, 52.5],
        [5.0, 6.0, 0, 50],
    ];

    for (let i = 0; i < grades.length; i++) {
        const [g_min, g_max, p_min, p_max] = grades[i];

        // Skip the 0.7-0.99 bucket to prefer 1.0 for 100%
        if (p_max === p_min && p_max === 100 && g_min === 0.7) {
             continue;
        }

        if (percent >= p_min && percent <= p_max) {
             // grade = g_max - ((percent - p_min) * (g_max - g_min) / (p_max - p_min))
             const grade = g_max - ((percent - p_min) * (g_max - g_min) / (p_max - p_min));
             return Math.round(grade * 100) / 100;
        }
    }
    return -1;
}

function calcGUC(americanGPA) {
    if (isNaN(americanGPA) || americanGPA === '') {
        return 'Please enter a valid GPA';
    }
    if (americanGPA < 0 || americanGPA > 4.0) {
        return 'Invalid GPA range (0.0 - 4.0)';
    }
    const gucGrade = calcGUCGrade(americanGPA);
    return `Your GUC GPA is: <strong>${gucGrade}</strong>`;
}


// UI Interaction
function convertGPA() {
    const input = document.getElementById('gpa-input');
    const result = document.getElementById('result');
    const value = parseFloat(input.value);

    if (state.mode === 'guc_to_american') {
        result.innerHTML = calcGPA(value);
    } else {
        result.innerHTML = calcGUC(value);
    }
}

function toggleMode() {
    const input = document.getElementById('gpa-input');
    const result = document.getElementById('result');
    const title = document.getElementById('converter-title');
    const convertBtn = document.getElementById('convert-btn');
    const swapBtn = document.getElementById('swap-btn');

    // Clear values
    input.value = '';
    result.innerHTML = 'Enter your GPA to see the conversion';

    if (state.mode === 'guc_to_american') {
        state.mode = 'american_to_guc';
        title.innerText = 'American to GUC Converter';
        input.placeholder = 'Enter your American GPA...';
        input.min = 0;
        input.max = 4;
        convertBtn.innerText = 'Convert to GUC GPA';
        // swapBtn transform could go here if we want animation
    } else {
        state.mode = 'guc_to_american';
        title.innerText = 'GUC GPA Converter';
        input.placeholder = 'Enter your GUC GPA...';
        input.min = 0.7;
        input.max = 6;
        convertBtn.innerText = 'Convert to American GPA';
    }
}

function incrementGPA() {
    const input = document.getElementById('gpa-input');
    let currentValue = parseFloat(input.value);

    if (isNaN(currentValue)) {
        currentValue = state.mode === 'guc_to_american' ? 0.7 : 0.0;
    }

    let newValue;
    if (state.mode === 'guc_to_american') {
        // GUC: 0.7 to 6.0
        newValue = Math.min(currentValue + 0.01, 6.0);
    } else {
        // American: 0.0 to 4.0
        newValue = Math.min(currentValue + 0.01, 4.0);
    }

    input.value = newValue.toFixed(2);
    convertGPA();
}

function decrementGPA() {
    const input = document.getElementById('gpa-input');
    let currentValue = parseFloat(input.value);

    if (isNaN(currentValue)) {
        currentValue = state.mode === 'guc_to_american' ? 0.7 : 0.0;
    }

    let newValue;
    if (state.mode === 'guc_to_american') {
        // GUC: 0.7 to 6.0
        newValue = Math.max(currentValue - 0.01, 0.7);
    } else {
        // American: 0.0 to 4.0
        newValue = Math.max(currentValue - 0.01, 0.0);
    }

    input.value = newValue.toFixed(2);
    convertGPA();
}


// Continuous increment/decrement
let incrementInterval;
let decrementInterval;

function startIncrement() {
    incrementGPA();
    incrementInterval = setInterval(incrementGPA, 100);
}

function stopIncrement() {
    clearInterval(incrementInterval);
}

function startDecrement() {
    decrementGPA();
    decrementInterval = setInterval(decrementGPA, 100);
}

function stopDecrement() {
    clearInterval(decrementInterval);
}

// Initialization
document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('gpa-input');
    if (input) {
        input.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                convertGPA();
            }
        });

        input.addEventListener('input', function () {
            if (this.value) {
                convertGPA();
            }
        });
    }
});
