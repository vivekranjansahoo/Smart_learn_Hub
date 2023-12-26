from flask import Flask, request, jsonify
from sklearn.ensemble import RandomForestClassifier  # Assuming a classification task
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report, confusion_matrix
from flask_cors import CORS
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
import pandas as pd
import random
from datetime import datetime
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from googlesearch import search
import time
nltk.download('stopwords')
nltk.download('punkt')


app = Flask(__name__)

CORS(app)

# Load your dataset (replace 'your_dataset.csv' with your actual dataset file)
df = pd.read_csv('./courses.csv')

# Preprocess the data
le = LabelEncoder()
df['category'] = le.fit_transform(df['category'])

# Split the data
X = df[['category']]
y = df['course_name']
print(f'Unique Classes: {le.classes_}')

print(df['category'].value_counts())
print(df.head())

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


model = RandomForestClassifier()
model.fit(X_train, y_train)


y_pred = model.predict(X_test)
# accuracy = sum(y_pred == y_test) / len(y_test)
# print(f"Manual Accuracy: {accuracy}")
# accuracy = accuracy_score(y_test, y_pred)
# print(f'Model Accuracy: {accuracy}')

# print("True Labels:", y_test)
# print("Predictions:", y_pred)

# print(df['category'].unique())

# precision = precision_score(y_test, y_pred, average='weighted')
# recall = recall_score(y_test, y_pred, average='weighted')
# f1 = f1_score(y_test, y_pred, average='weighted')

# print('\nClassification Report:')
# print(classification_report(y_test, y_pred))

# Print confusion matrix
print('\nConfusion Matrix:')
print(confusion_matrix(y_test, y_pred))

# plot_decision_regions(X_train.values, y_train, clf=model, legend=2)
# plt.xlabel('Feature 1')
# plt.ylabel('Feature 2')
# plt.title('Decision Boundaries')
# plt.show()

# Endpoint for recommendation
@app.route('/recommend', methods=['GET'])
def recommend():
    category = request.args.get('category', type=str)

    if category is None:
        return jsonify({'error': 'Category parameter is missing'})

    # Preprocess user input
    user_input = pd.DataFrame({'category': [category]})
    user_input['category'] = le.transform(user_input['category'])

    # Make a prediction
    # prediction = model.predict(user_input[['category']])

    # Filter and recommend the top courses in the predicted category
    recommended_courses = df[df['category'] == user_input['category'].values[0]]

    # Sort by rating and watch_time to get top recommendations
    recommended_courses = recommended_courses.sort_values(by=['rating', 'watch_time'], ascending=[False, False])

    # Get the top recommended courses
    top_recommendations = recommended_courses[['course_name', 'rating', 'watch_time']].head(5).to_dict(orient='records')

    return jsonify({'top_recommendations': top_recommendations})

@app.route('/courses', methods=['GET'])
def get_courses_by_category():
    category = request.args.get('category', type=str)

    if category is None:
        return jsonify({'error': 'Category parameter is missing'}), 400

    filtered_courses = df[df['category'] == le.transform([category])[0]][['course_name', 'rating', 'watch_time']].to_dict(orient='records')

    return jsonify({'courses': filtered_courses})


#-----------------------------------------

html_questions = [
    "What does HTML stand for?",
    "Which tag is used to define an unordered list in HTML?",
    "In HTML, what does the <a> tag represent?",
    "What is the purpose of the <head> tag in HTML?",
    "Which attribute is used to define inline styles in HTML?",
    "What does the <br> tag represent in HTML?",
]

answer_choices = [
    [["Hyper Text Markup Language", "Highly Textual Makeup Language", "Hyper Transfer Markup Language", "High Text Markup Language"], "A"],
    [["<ul>", "<li>", "<ol>", "<dl>"], "A"],
    [["Anchor", "Attribute", "Abbreviation", "Action"], "A"],
    [["It defines the main content of the HTML document", "It contains metadata about the HTML document", "It specifies the character set for the HTML document", "It defines a section that contains navigation links"], "B"],
    [["style", "class", "id", "font"], "A"],
    [["Line break", "List", "Paragraph", "Bold"], "A"],
]

def generate_html_mcq():
    index = random.randint(0, len(html_questions) - 1)
    question = html_questions[index]
    choices, correct_answer = answer_choices[index]
    random.shuffle(choices)

    mcq_data = {
        'question': question,
        'choices': choices,
        'correct_answer': correct_answer
    }

    return mcq_data

@app.route('/generate_mcq', methods=['GET'])
def generate_html_mcq_route():
    mcq_data = generate_html_mcq()
    return jsonify(mcq_data)

@app.route('/check_answer', methods=['POST'])
def check_answer():
    data = request.json
    user_answer = data['user_answer']
    correct_answer = data['correct_answer']

    is_correct = user_answer.upper() == correct_answer
    return jsonify({'is_correct': is_correct})


#-------------------------------------------------------------
data = pd.read_csv('data.csv')

# Extract features and target variable
X = data[['category', 'level_of_difficulty', 'recently_added_date', 'rating']]
y = data['project_name']

# Define preprocessing steps
# One-hot encode 'category' and 'level_of_difficulty'
preprocessor = ColumnTransformer(
    transformers=[
        ('category', OneHotEncoder(handle_unknown='ignore'), ['category', 'level_of_difficulty'])
    ])

# Define the model (Random Forest Classifier)
model = RandomForestClassifier()

# Create a pipeline with preprocessing and the model
pipeline = Pipeline([
    ('preprocessor', preprocessor),
    ('model', model)
])

# Train the model
pipeline.fit(X, y)

# User input for recommendation
# user_category = input("Enter the category: ")
# user_level_of_difficulty = input("Enter the level of difficulty: ")

# Get the current date
current_date = datetime.now().strftime('%Y-%m-%d')

@app.route('/recommendproject', methods=['GET'])
def recommendation():
    try:
        user_category = request.args.get('category', type=str)
        user_level_of_difficulty=request.args.get('difficulty', type=str)
        # request_data = request.get_json()
        # user_category = request_data['category']
        # user_level_of_difficulty = request_data['difficulty']
        
        # Get the current date
        current_date = datetime.now().strftime('%Y-%m-%d')

        # Create a DataFrame from the user input with the current date
        user_df = pd.DataFrame({
            'category': [user_category],
            'level_of_difficulty': [user_level_of_difficulty],
            'recently_added_date': [current_date],
            'rating': [0]  # Replace with actual values
        })

        # Make predictions on user input
        predicted_project_name = pipeline.predict(user_df)

        # Recommend projects based on rating and recently added date for the specified category
        recommendations = data[(data['category'] == user_category) & (data['level_of_difficulty'] == user_level_of_difficulty)].sort_values(by=['rating', 'recently_added_date'], ascending=[False, False])

        # Display the top recommendations
        top_recommendations = recommendations[['project_name', 'rating', 'level_of_difficulty', 'recently_added_date']].head(5)

        # Convert recommendations to JSON
        response_data = top_recommendations.to_dict(orient='records')

        return jsonify({'success': True, 'recommendations': response_data})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


#-----------------------------------------------------------------------
def preprocess_input(user_input):
    # Tokenize the input and remove stopwords
    stop_words = set(stopwords.words('english'))
    word_tokens = word_tokenize(user_input)
    filtered_tokens = [word for word in word_tokens if word.lower() not in stop_words]
    return ' '.join(filtered_tokens)

def search_google(query, num_results=5):
    # Perform a Google search and return top results
    links = []
    count = 0
    for j in search(query, num_results=num_results):
        links.append(j)
        count += 1
        if count >= num_results:
            break
        # Introduce a delay to avoid being blocked
        time.sleep(2)
    return links

def get_study_links(user_input, num_results=5):
    # Preprocess user input
    processed_input = preprocess_input(user_input)

    # Perform Google search
    search_results = search_google(processed_input, num_results)

    # Extract relevant information from the search results (e.g., top-rated study websites)
    study_links = []
    for result in search_results:
        study_links.append(result)

    return study_links

@app.route('/chatbot', methods=['POST'])

def get_study_links_route():
    try:
        # Get user input from the request
        user_input = request.json.get('user_input')

        # Get study links
        study_links = get_study_links(user_input)

        # Return study links as JSON
        return jsonify({'success': True, 'study_links': study_links})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
