import random

def generate_html_mcq():
    # HTML-related question templates
    html_questions = [
        "What does HTML stand for?",
        "Which tag is used to define an unordered list in HTML?",
        "In HTML, what does the <a> tag represent?",
        "What is the purpose of the <head> tag in HTML?",
        "Which attribute is used to define inline styles in HTML?",
        "What does the <br> tag represent in HTML?",
    ]

    # Corresponding answer choices and correct answers
    answer_choices = [
        [["Hyper Text Markup Language", "Highly Textual Makeup Language", "Hyper Transfer Markup Language", "High Text Markup Language"], "A"],
        [["<ul>", "<li>", "<ol>", "<dl>"], "A"],
        [["Anchor", "Attribute", "Abbreviation", "Action"], "A"],
        [["It defines the main content of the HTML document", "It contains metadata about the HTML document", "It specifies the character set for the HTML document", "It defines a section that contains navigation links"], "B"],
        [["style", "class", "id", "font"], "A"],
        [["Line break", "List", "Paragraph", "Bold"], "A"],
    ]

    # Randomly select a question template and answer choices
    index = random.randint(0, len(html_questions) - 1)
    question = html_questions[index]
    choices, correct_answer = answer_choices[index]

    # Randomize the order of answer choices
    random.shuffle(choices)

    # Create the MCQ format
    mcq = f"{question}\n\nA. {choices[0]}\nB. {choices[1]}\nC. {choices[2]}\nD. {choices[3]}"

    return mcq, correct_answer

def check_answer(user_answer, correct_answer):
    return user_answer.upper() == correct_answer

def main():
    score = 0
    num_questions = 6  # Adjust the number of questions as needed

    for _ in range(num_questions):
        question, correct_answer = generate_html_mcq()

        print(f"\nGenerated MCQ:\n{question}")

        # Simulate user input
        user_response = input("Your answer (A/B/C/D): ")

        # Check the answer and update the score
        if check_answer(user_response, correct_answer):
            print("Correct!\n")
            score += 1
        else:
            print(f"Incorrect. The correct answer is {correct_answer}.\n")

    # Print the final score
    print(f"Your final score: {score}/{num_questions}")

if __name__ == "__main__":
    main()
