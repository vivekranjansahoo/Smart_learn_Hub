import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from googlesearch import search
import time

nltk.download('stopwords')
nltk.download('punkt')

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

# Example usage in a Jupyter Notebook cell:
user_input = input("Enter your topic of interest: ")
study_links = get_study_links(user_input)

print("\nTop-rated study websites:")
for i, link in enumerate(study_links, start=1):
    print(f"{i}. {link}")