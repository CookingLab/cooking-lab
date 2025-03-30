import os
import random
import requests

# Get GitHub token from environment variable
token = os.getenv("GITHUB_TOKEN")

# GitHub API URL
pr_number = os.getenv("GITHUB_EVENT_PULL_REQUEST_NUMBER")

headers = {
    "Authorization": f"Bearer {token}",
    "Accept": "application/vnd.github.v3+json"
}

# List of fun messages with emojis
messages = [
    "This PR looks delicious! 😋🍴",
    "This PR is well-seasoned and cooked to perfection! 🔥👌",
    "Yum! This PR is just right! 😍🍲",
    "This PR could use a little more spice! 🌶️⚡",
    "The code is almost perfect, just add a pinch of salt! 🧂💡",
    "Tasty code, but let’s add some extra flavor! 🍛✨",
    "This PR is a gourmet masterpiece! 👨‍🍳🌟",
    "Mmm, it's good, but I think it needs some more cheese 🧀😊",
    "This PR is looking fresh and tasty! 🥗🍋",
    "It’s a bit undercooked, let’s reheat it! 🍕🔥"
]

# Function to analyze the PR (you can replace this with actual analysis)
def analyze_pr():
    # For now, randomly choose a fun message from the list
    return random.choice(messages)

# Function to post a comment on the PR
def post_comment(message):
    comment_url = f"https://api.github.com/repos/{os.getenv('GITHUB_REPOSITORY')}/issues/{pr_number}/comments"
    response = requests.post(comment_url, json={"body": message}, headers=headers)
    return response

# Main logic
message = analyze_pr()
response = post_comment(message)

# Check if the comment was successfully posted
if response.status_code == 201:
    print("Comment posted successfully!")
else:
    print(f"Failed to post comment. Status code: {response.status_code}, Response: {response.text}")
