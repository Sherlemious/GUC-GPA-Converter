// Core conversion algorithms for the GUC / GIU GPA Converter.
// Works for both the German University in Cairo (GUC) and the German
// International University (GIU), which share the same grading scale.
// The live UI in index.html embeds this same logic; these exports mirror it
// so the conversion math has a single, testable source of truth.

// Shared interpolation table: [germanLow, germanHigh, percentLow, percentHigh].
const GRADE_TABLE = [
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

// German cumulative grade -> interpolated percentage.
function calcPercent(grade) {
  for (let i = 0; i < GRADE_TABLE.length; i++) {
    const key = GRADE_TABLE[i];
    if (grade >= key[0] && grade <= key[1]) {
      return ((key[1] - grade) * (key[3] - key[2])) / (key[1] - key[0]) + key[2];
    }
  }
  return -1;
}

// Percentage -> American 4.0 GPA (rounded to 2 dp).
function getGPA(percent) {
  return Math.round((percent / 100) * 4 * 100) / 100;
}

// American 4.0 GPA -> German cumulative grade (inverse interpolation).
function calcGUCGrade(americanGPA) {
  if (americanGPA < 0 || americanGPA > 4.0) return -1;
  const percent = americanGPA * 25;
  for (let i = 0; i < GRADE_TABLE.length; i++) {
    const [g_min, g_max, p_min, p_max] = GRADE_TABLE[i];
    // Skip the 0.7-0.99 bucket so a perfect 100% resolves to 1.0.
    if (p_max === p_min && p_max === 100 && g_min === 0.7) continue;
    if (percent >= p_min && percent <= p_max) {
      const grade = g_max - ((percent - p_min) * (g_max - g_min) / (p_max - p_min));
      return Math.round(grade * 100) / 100;
    }
  }
  return -1;
}

// Letter grade for a German cumulative grade, per the transcript key.
function letterFor(grade) {
  if (grade <= 0.99) return 'A+';
  if (grade <= 1.29) return 'A';
  if (grade <= 1.69) return 'A-';
  if (grade <= 1.99) return 'B+';
  if (grade <= 2.29) return 'B';
  if (grade <= 2.69) return 'B-';
  if (grade <= 2.99) return 'C+';
  if (grade <= 3.29) return 'C';
  if (grade <= 3.69) return 'C-';
  if (grade <= 3.99) return 'D+';
  if (grade <= 4.99) return 'D';
  return 'F';
}

// Cumulative classification bands from the official transcript key.
function classificationFor(grade) {
  if (grade <= 1.54) return 'Excellent';
  if (grade <= 2.54) return 'Very Good';
  if (grade <= 3.54) return 'Good';
  if (grade <= 3.70) return 'Satisfactory';
  return 'Below Passing';
}

// Latin honors bands, or null if none apply.
function honorsFor(grade) {
  if (grade <= 0.99) return 'Highest Honors';
  if (grade <= 1.29) return 'High Honors';
  if (grade <= 1.69) return 'Honors';
  return null;
}

// Full conversion, either direction.
//   direction 'guc_to_american': grade is a German grade in [0.7, 5.0]
//   direction 'american_to_guc': grade is an American GPA in [0.0, 4.0]
function convert(value, direction = 'guc_to_american') {
  if (isNaN(value)) return { error: 'Please enter a valid GPA' };

  if (direction === 'american_to_guc') {
    if (value < 0 || value > 4.0) return { error: 'Invalid GPA range (0.0 - 4.0)' };
    const guc = calcGUCGrade(value);
    return {
      guc,
      letter: letterFor(guc),
      classification: classificationFor(guc),
      honors: honorsFor(guc),
    };
  }

  if (value < 0.7 || value > 5.0) return { error: 'Invalid GPA range (0.7 - 5.0)' };
  return {
    american: getGPA(calcPercent(value)),
    letter: letterFor(value),
    classification: classificationFor(value),
    honors: honorsFor(value),
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calcPercent, getGPA, calcGUCGrade,
    letterFor, classificationFor, honorsFor, convert,
  };
}
