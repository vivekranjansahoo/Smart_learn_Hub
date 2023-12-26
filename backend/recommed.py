import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Load the dataset from your CSV file
df = pd.read_csv('courses.csv')

# Combine relevant features into a single column for TF-IDF
df['features'] = df['course_name'] + ' ' + df['category']

# Initialize the TF-IDF vectorizer
tfidf_vectorizer = TfidfVectorizer(stop_words='english')

# Fit and transform the data
tfidf_matrix = tfidf_vectorizer.fit_transform(df['features'])

# Compute the cosine similarity matrix
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

# Function to get course recommendations based on course name
def get_course_recommendations(course_name, cosine_sim=cosine_sim, df=df):
    # Get the index of the course
    idx = df.index[df['course_name'] == course_name].tolist()[0]

    # Get the pairwise similarity scores
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort the courses based on similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get the top 5 similar courses (excluding itself)
    sim_scores = sim_scores[1:6]

    # Get the course indices
    course_indices = [score[0] for score in sim_scores]

    # Return the recommended courses and similarity scores
    return df[['course_name', 'features']].iloc[course_indices], sim_scores

# Example: Get recommendations for a specific course
course_to_recommend = 'Introduction to HTML'
recommendations, sim_scores = get_course_recommendations(course_to_recommend)
print(f"Recommended courses for '{course_to_recommend}':")
print(recommendations)

print(f"Similarity Scores for '{course_to_recommend}':")
for rec, score in zip(recommendations['course_name'], sim_scores):
    print(f"{rec}: {score[1]}")  # Access the similarity score using score[1]
