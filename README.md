# GUC GPA to American GPA Converter

This project provides a web-based tool to convert German University of Cairo (GUC) GPA to American GPA. The conversion is based on interpolation between grade ranges to calculate the exact percentages, followed by applying the American GPA formula.

## Features

- **Responsive Design**: The web application is fully responsive and works seamlessly on both desktop and mobile devices.
- **Automatic Conversion**: The GPA conversion is performed automatically as you enter your GUC GPA.
- **Dark Mode**: The application uses a dark color scheme for a modern and visually appealing interface.

## How It Works

The conversion process involves two main steps:

1. **Calculating the Percentage**:

   - The function `calcPercent` takes a GUC GPA as input and uses linear interpolation to determine the corresponding percentage.
   - It iterates through predefined grade ranges and applies the formula to calculate the exact percentage based on the input GPA.

2. **Calculating the American GPA**:
   - The function `getGPA` takes the calculated percentage and converts it to the American GPA using the formula `(percent / 100) * 4`.
   - The function `calcGPA` combines these steps, first validating the input GPA, then calculating the percentage, and finally converting it to the American GPA.

## Usage

1. Clone the repository or download the files.
2. Open `index.html` in your web browser.
3. Enter your GUC GPA in the input field.
4. The American GPA will be displayed automatically.

## Code Overview

### HTML

The `index.html` file contains the structure of the web application, including the input field, button, and result display area. It also includes the necessary CSS for styling and JavaScript for functionality.

### CSS

The CSS styles are defined within the `index.html` file to ensure a consistent look and feel. The styles include responsive design adjustments for different screen sizes.

### JavaScript

The `index.js` file contains the logic for converting the GUC GPA to American GPA. The main functions are:

- `calcPercent(grade)`: Calculates the percentage based on the input GUC GPA.
- `getGPA(percent)`: Converts the calculated percentage to American GPA.
- `calcGPA(gpa)`: Combines the above functions to perform the full conversion.
- `convertGPA()`: Handles the input event and updates the result display.

## Example

Enter your GUC GPA: `1.3`

Your American GPA is: `3.6`

## Requirements

- A modern web browser (Chrome, Firefox, Safari, Edge, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgements

- Inspired by the need to provide an easy and accurate way to convert GUC GPA to American GPA.

## Contact

For any questions or suggestions, please contact [Sherlemious](https://www.linkedin.com/in/sherlemious/).

---

Enjoy using the GUC GPA to American GPA Converter!
