import os
import requests

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
REPO = os.getenv("GITHUB_REPOSITORY")
PR_NUMBER = os.getenv("GITHUB_REF").split("/")[-1]

# Cooking-themed messages
MESSAGES = [
    "This PR is as tasty as a perfectly baked croissant! 🥐",
    "Looks great, but maybe it needs a pinch of salt? 🧂",
    "Nice work! This code is well-seasoned. 🍲",
    "Hmmm, some parts might be undercooked... let's review it more! 🍗",
]

# Post a comment on the PR
def post_comment(message):
    url = f"https://api.github.com/repos/{REPO}/issues/{PR_NUMBER}/comments"
    headers = {"Authorization": f"token {GITHUB_TOKEN}", "Accept": "application/vnd.github.v3+json"}
    data = {"body": message}
    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 201:
        print("Comment posted successfully!")
    else:
        print("Failed to post comment:", response.text)

# Pick a random cooking message
import random
comment_message = random.choice(MESSAGES)

post_comment(comment_message)