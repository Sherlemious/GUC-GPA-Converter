function calcPercent(grade) {
    const grades = [
        [0.7, 0.99, 94, 100],
        [1.0, 1.29, 90, 93.9],
        [1.3, 1.69, 86, 89.9],
        [1.7, 1.99, 82, 85.9],
        [2.0, 2.29, 78, 81.9],
        [2.3, 2.69, 74, 77.9],
        [2.7, 2.99, 70, 73.9],
        [3.0, 3.29, 65, 69.9],
        [3.3, 3.69, 60, 64.9],
        [3.7, 3.99, 55, 59.9],
        [4.0, 4.99, 50, 54.9],
        [5.0, 6.0, 0, 49.9]
    ];

    for (let i = 0; i < grades.length; i++) {
        const key = grades[i];
        if (grade >= key[0] && grade <= key[1]) {
            return (key[1] - grade) * (key[3] - key[2]) / (key[1] - key[0]) + key[2];
        }
    }
    return -1;
}

function getGPA(percent) {
    return Math.round(percent / 100 * 4 * 100) / 100;
}

function calcGPA(gpa) {
    if (gpa < 0.7 || gpa > 6.0) {
        return "Invalid GPA";
    }
    const percent = calcPercent(gpa);
    const americanGPA = getGPA(percent);
    return "Your American GPA is: " + americanGPA;
}

function convertGPA() {
    const gucGPA = parseFloat(document.getElementById("guc-gpa").value);
    const result = document.getElementById("result");
    result.innerHTML = calcGPA(gucGPA);
}