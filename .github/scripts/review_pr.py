import os
import requests

# Get GitHub token from environment variable
token = os.getenv("GITHUB_TOKEN")

# GitHub API URL
pr_url = os.getenv("GITHUB_EVENT_PULL_REQUEST_URL")
pr_number = os.getenv("GITHUB_EVENT_PULL_REQUEST_NUMBER")

headers = {
    "Authorization": f"Bearer {token}",
    "Accept": "application/vnd.github.v3+json"
}

# Analyze the PR's code (simplified for example)
def analyze_pr():
    # You can implement your analysis logic here
    return "This PR looks delicious"  # Placeholder message

# Post a comment on the PR
def post_comment(message):
    comment_url = f"https://api.github.com/repos/{os.getenv('GITHUB_REPOSITORY')}/issues/{pr_number}/comments"
    response = requests.post(comment_url, json={"body": message}, headers=headers)

    if response.status_code == 201:
        print("Comment posted successfully!")
    else:
        print(f"Failed to post comment. Status code: {response.status_code}, Response: {response.text}")
    return response

# Main logic
message = analyze_pr()
post_comment(message)
