# GUC-GPA-Converter

This Python script converts German GUC GPA to American GPA. It uses interpolation between each grade to calculate the exact percentages since the grade ranges are not linear. The script then applies the American GPA formula to calculate the GPA.

## Usage

1. Clone the repository or download the `main.py` file
2. Run the script in the terminal with the command `main.py`
3. Enter your GUC GPA when prompted
4. The script will output your American GPA

## How it works

The script uses a dictionary of grade ranges and their corresponding percentage ranges. It then applies linear interpolation to calculate the exact percentage based on the input GUC GPA. Finally, the script applies the American GPA formula to calculate the GPA.

## Requirements

- Python 3.0 or above

## Example

Enter your GUC GPA: 1.3
Your GPA is: 3.6
