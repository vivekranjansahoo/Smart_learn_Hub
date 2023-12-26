from flask import Flask, request, jsonify
from sklearn.ensemble import RandomForestClassifier  # Assuming a classification task
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

import pandas as pd

app = Flask(__name__)

# Load your dataset (replace 'your_dataset.csv' with your actual dataset file)
df = pd.read_csv('./courses.csv')

# Preprocess the data
le = LabelEncoder()
df['category'] = le.fit_transform(df['category'])

# Split the data
X = df[['category']]
y = df['course_name']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Build a classification model (Random Forest in this example)
# model = RandomForestClassifier()
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)


print(f"X_train shape: {X_train.shape}")
print(f"y_train shape: {y_train.shape}")
print(f"X_test shape: {X_test.shape}")
print(f"y_test shape: {y_test.shape}")

y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Model Accuracy: {accuracy}')


# Endpoint for recommendation
@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()

    # Preprocess user input
    user_input = pd.DataFrame([data])
    user_input['category'] = le.transform(user_input['category'])

    # Make a prediction
    prediction = model.predict(user_input[['category']])

    # Filter and recommend the top courses in the predicted category
    recommended_courses = df[df['category'] == user_input['category'].values[0]]

    # Sort by rating and watch_time to get top recommendations
    recommended_courses = recommended_courses.sort_values(by=['rating', 'watch_time'], ascending=[False, False])

    # Get the top recommended courses
    top_recommendations = recommended_courses[['course_name', 'rating', 'watch_time']].head(5).to_dict(orient='records')

    return jsonify({'top_recommendations': top_recommendations, 'model_accuracy': accuracy})

if __name__ == '__main__':
    app.run(debug=True)
