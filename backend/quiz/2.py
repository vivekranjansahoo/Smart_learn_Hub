import csv
import random
from faker import Faker
import pandas as pd
from datetime import datetime, timedelta

fake = Faker()

# Function to generate a random date within the last year
def generate_recent_date():
    end_date = datetime.now()
    start_date = end_date - timedelta(days=365)
    return fake.date_between(start_date=start_date, end_date=end_date)

# Function to generate a row for the dataset
def generate_row():
    question_name = fake.sentence()
    question_ans = fake.paragraph()
    category = random.choice(['HTML', 'CSS', 'JS'])
    rating = random.randint(1, 5)
    recently_added_date = generate_recent_date()

    return [question_name, question_ans, category, rating, recently_added_date]

# Header for the CSV file
header = ['Question Name', 'Question Answer', 'Category', 'Rating', 'Recently Added Date']

# Generating 100 rows of data
rows = [generate_row() for _ in range(100)]

# Creating a DataFrame using pandas
df = pd.DataFrame(rows, columns=header)

# Save the DataFrame to a CSV file
df.to_csv('generated_dataset.csv', index=False)

print('Dataset has been created and saved as generated_dataset.csv')

# Function to load the dataset
def load_dataset(file_path):
    with open(file_path, 'r', newline='') as csvfile:
        csvreader = csv.reader(csvfile)
        header = next(csvreader)
        dataset = list(csvreader)
    return header, dataset

# Function to recommend questions
def recommend_questions(dataset, category):
    # Filter questions by category
    filtered_questions = [row for row in dataset if row[2] == category]

    # Sort questions based on rating and recently added
    filtered_questions.sort(key=lambda x: (int(x[3]), x[4]), reverse=True)

    # Return the top 5 questions
    return filtered_questions[:5]

# Load the dataset
header, dataset = load_dataset('generated_dataset.csv')

# User input
category = input("Enter the category (HTML, CSS, JS): ")

# Recommend and display questions
recommended_questions = recommend_questions(dataset, category)
print(f"\nTop 5 Recommended Questions in {category}:")
for i, question in enumerate(recommended_questions, 1):
    print(f"{i}. {question[0]}")
