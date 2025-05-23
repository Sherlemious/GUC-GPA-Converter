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
    return 'Invalid GPA';
  }
  const percent = calcPercent(gpa);
  const americanGPA = getGPA(percent);
  return 'Your American GPA is: ' + americanGPA;
}

function convertGPA() {
  const gucGPA = parseFloat(document.getElementById('guc-gpa').value);
  const result = document.getElementById('result');
  result.innerHTML = calcGPA(gucGPA);
}

// Add event listener for Enter key
document.addEventListener('DOMContentLoaded', function () {
  const gpaInput = document.getElementById('guc-gpa');
  if (gpaInput) {
    gpaInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        convertGPA();
      }
    });
  }
});
