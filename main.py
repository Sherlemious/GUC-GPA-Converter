"""
This script converts your German GUC GPA to the American GPA
It uses interpolation between each grade to calculate the exact percentages, 
this is because the grade ranges are not linear
then it uses the American GPA formula to calculate the GPA
"""
grades = {
    (0.7, 0.99): (94, 100),
    (1.0, 1.29): (90, 93.9),
    (1.3, 1.69): (86, 89.9),
    (1.7, 1.99): (82, 85.9),
    (2.0, 2.29): (78, 81.9),
    (2.3, 2.69): (74, 77.9),
    (2.7, 2.99): (70, 73.9),
    (3.0, 3.29): (65, 69.9),
    (3.3, 3.69): (60, 64.9),
    (3.7, 3.99): (55, 59.9),
    (4.0, 4.99): (50, 54.9),
    (5.00, 6.00): (0, 49.9)
}

def calcPercent(grade):
    """
    :param grade: float between 0.7 and 6.0
    :return: float
    """
    for key in grades:
        if grade >= key[0] and grade <= key[1]:
            return (key[1]-grade) * (grades[key][1] - grades[key][0]) / (key[1] - key[0]) + grades[key][0]
    return -1

def calcGPA(percent):
    """
    :param percent: float between 0 and 100
    :return: float
    """
    return round(percent/100 * 4, 2)

def main():
    print("Enter your GUC GPA:", end=" ")
    gpa = float(input())
    if gpa < 0.7 or gpa > 6.0:
        print("Invalid GPA")
        return
    print("Your GPA is: " + str(calcGPA(calcPercent(gpa))))

main()
