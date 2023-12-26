from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

# Step 1: Generate Dataset
def generate_random_data(num_questions=100):
    categories = ['HTML', 'CSS', 'JavaScript']
    levels = ['Easy', 'Intermediate', 'Advanced']
    ratings = [4.0, 4.2, 4.5, 4.8, 5.0]

    data = {
        'question_name': [f'Question_{i}' for i in range(1, num_questions + 1)],
        'question_ans': [f'Answer_{i}' for i in range(1, num_questions + 1)],
        'category': [random.choice(categories) for _ in range(num_questions)],
        'level_of_difficulty': [random.choice(levels) for _ in range(num_questions)],
        'rating': [random.choice(ratings) for _ in range(num_questions)],
        'recently_added_date': [datetime.now() - timedelta(days=random.randint(1, 365)) for _ in range(num_questions)],
    }

    return pd.DataFrame(data)

# Save the generated dataset to a CSV file
dataset = generate_random_data()
dataset.to_csv('questions_dataset.csv', index=False)

# Step 2: Build Machine Learning Model
data = pd.read_csv('questions_dataset.csv')
X = data[['category', 'level_of_difficulty', 'rating']]
y = data['question_name']

# Handle NaN values in the 'category' column
data['category'] = data['category'].fillna('Unknown')

le_category = LabelEncoder()
data['category'] = le_category.fit_transform(data['category'])

preprocessor = ColumnTransformer(
    transformers=[
        ('category', OneHotEncoder(handle_unknown='ignore'), ['category', 'level_of_difficulty']),
    ])

model = RandomForestClassifier()
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('model', model)
])

pipeline.fit(X, y)

# Step 3: Flask Application
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()

    # Preprocess user input
    user_input = pd.DataFrame([data])
    user_input['category'] = le_category.transform(user_input['category'])
    user_input['level_of_difficulty'] = le_category.transform(user_input['level_of_difficulty'])

    # Make a prediction
    prediction = pipeline.predict(user_input[['category', 'level_of_difficulty', 'rating']])

    # Filter and recommend the top questions in the predicted category and difficulty level
    recommended_questions = dataset[(dataset['category'] == user_input['category'].values[0]) &
                                    (dataset['level_of_difficulty'] == user_input['level_of_difficulty'].values[0])]

    # Sort by rating and recently_added_date to get top recommendations
    recommended_questions = recommended_questions.sort_values(by=['rating', 'recently_added_date'], ascending=[False, False])

    # Get the top recommended questions
    top_recommendations = recommended_questions[['question_name', 'rating', 'recently_added_date']].head(5).to_dict(orient='records')

    return jsonify({'top_recommendations': top_recommendations})

@app.route('/quiz', methods=['GET'])
def quiz():
    category = request.args.get('category', type=str)
    level = request.args.get('level', type=str)

    if category is None or level is None:
        return jsonify({'error': 'Category or level parameter is missing'})

    # Filter questions for the selected category and level
    category_questions = data[(data['category'] == category) & (data['level_of_difficulty'] == level)]

    if category_questions.empty:
        return jsonify({'error': 'No questions available for the specified category and level'})

    # Randomly select a question
    quiz_question = category_questions.sample(1).iloc[0]

    # Prepare quiz options (using dummy options for illustration)
    options = category_questions.sample(3)['question_ans'].tolist()
    options.append(quiz_question['question_ans'])
    random.shuffle(options)

    return render_template('quiz.html', question=quiz_question['question_name'], options=options)

# Simple scoring mechanism
@app.route('/score', methods=['POST'])
def score():
    data = request.get_json()

    # Calculate the score based on correct answers
    user_answers = data['user_answers']
    correct_answers = data['correct_answers']

    score = sum(user_ans == correct_ans for user_ans, correct_ans in zip(user_answers, correct_answers))

    return jsonify({'score': score})

if __name__ == '__main__':
    app.run(debug=True)
