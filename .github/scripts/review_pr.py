import os
import re
import requests

# Get repository name (OWNER/REPO)
REPO = os.getenv("GITHUB_REPOSITORY")  # Example: "CookingLabOrg/RecipeRoulette"

# Extract PR number correctly from GitHub ref
GITHUB_REF = os.getenv("GITHUB_REF", "")
match = re.search(r"refs/pull/(\d+)/", GITHUB_REF)
PR_NUMBER = match.group(1) if match else None

# Debugging logs
print(f"🔍 REPO: {REPO}")
print(f"🔍 GITHUB_REF: {GITHUB_REF}")
print(f"🔍 Extracted PR_NUMBER: {PR_NUMBER}")

if not PR_NUMBER:
    print("❌ Could not determine PR number. Exiting.")
    exit(1)

# Get GitHub Token
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
if not GITHUB_TOKEN:
    print("❌ GitHub Token is missing. Exiting.")
    exit(1)

# Check if PR is from a fork (GitHub restricts commenting on forks)
IS_FORK = os.getenv("GITHUB_HEAD_REF") is not None
if IS_FORK:
    print("❌ PR is from a fork. GitHub Actions cannot post comments due to permission restrictions.")
    exit(1)

# Fun cooking-themed comments
COOKING_COMMENTS = [
    "👨‍🍳 This PR looks delicious! Ready to be served! 🍽",
    "🥄 This PR is good, but maybe it needs a bit more seasoning! 🌿",
    "🔥 Spicy changes! Looking tasty!",
    "🍕 This PR is well-cooked and ready for delivery!",
    "🍵 A smooth and refined PR, just like a fine soup!"
]

import random
comment_body = random.choice(COOKING_COMMENTS)

# GitHub API endpoint for PR comments
url = f"https://api.github.com/repos/{REPO}/issues/{PR_NUMBER}/comments"

# Post comment
headers = {"Authorization": f"token {GITHUB_TOKEN}", "Accept": "application/vnd.github.v3+json"}
data = {"body": comment_body}

response = requests.post(url, headers=headers, json=data)

# Debugging response
if response.status_code == 201:
    print("✅ Successfully posted comment:", comment_body)
else:
    print(f"❌ Failed to post comment: {response.status_code}, {response.text}")
