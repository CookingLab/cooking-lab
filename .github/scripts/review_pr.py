import os
import random
import requests
import subprocess

# Get GitHub token from environment variable
token = os.getenv("GITHUB_TOKEN")
pr_number = os.getenv("GITHUB_EVENT_PULL_REQUEST_NUMBER")

headers = {
    "Authorization": f"Bearer {token}",
    "Accept": "application/vnd.github.v3+json"
}

# List of fun messages with emojis
messages = {
    "good": [
        "This PR looks delicious! 😋🍴",
        "This PR is well-seasoned and cooked to perfection! 🔥👌",
        "Yum! This PR is just right! 😍🍲",
        "The code is a gourmet masterpiece! 👨‍🍳🌟"
    ],
    "needs_improvement": [
        "This PR could use a little more spice! 🌶️⚡",
        "The code is almost perfect, just add a pinch of salt! 🧂💡",
        "Tasty code, but let’s add some extra flavor! 🍛✨",
        "It’s a bit undercooked, let’s reheat it! 🍕🔥"
    ]
}

# Function to analyze code quality
def analyze_code():
    # Run flake8 for linting
    flake8_result = subprocess.run(['flake8', '--max-line-length=80'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    # Run radon for complexity analysis
    radon_result = subprocess.run(['radon', 'cc', '.', '--max', '10'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    # Check for linting issues
    lint_output = flake8_result.stdout.decode()
    if lint_output:
        return "needs_improvement", lint_output
    
    # Check for code complexity
    complexity_output = radon_result.stdout.decode()
    if complexity_output:
        return "needs_improvement", complexity_output
    
    # If there are no issues, consider the code good
    return "good", "Code is clean and easy to follow."

# Function to post a comment on the PR
def post_comment(message):
    comment_url = f"https://api.github.com/repos/{os.getenv('GITHUB_REPOSITORY')}/issues/{pr_number}/comments"
    response = requests.post(comment_url, json={"body": message}, headers=headers)
    return response

# Main logic
def main():
    # Analyze the code quality
    status, analysis_result = analyze_code()
    
    # Select an appropriate message based on the analysis result
    if status == "good":
        message = random.choice(messages["good"])
    else:
        message = random.choice(messages["needs_improvement"]) + "\n\n" + analysis_result
    
    # Post the message to the PR
    response = post_comment(message)
    
    # Check if the comment was successfully posted
    if response.status_code == 201:
        print("Comment posted successfully!")
    else:
        print(f"Failed to post comment. Status code: {response.status_code}, Response: {response.text}")

if __name__ == "__main__":
    main()
