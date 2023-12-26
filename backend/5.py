# Import necessary libraries
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from datetime import datetime

# Load your specific dataset (replace 'data.csv' with your actual dataset)
# Assume the dataset has columns like 'project_name', 'category', 'level_of_difficulty', 'recently_added_date', 'rating'
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
user_category = input("Enter the category: ")
user_level_of_difficulty = input("Enter the level of difficulty: ")

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
top_recommendations = recommendations[['project_name', 'rating','level_of_difficulty', 'recently_added_date']].head(5)
print(f'\nTop 5 Recommendations for {user_category} projects with level of difficulty {user_level_of_difficulty} added recently:')
print(top_recommendations.to_string(index=False))
