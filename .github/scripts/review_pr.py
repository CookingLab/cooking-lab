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


# Function to analyze TypeScript code quality with ESLint
def analyze_code():
    # Run ESLint without fixing issues
    eslint_result = subprocess.run(
        ['npx', 'eslint', '--max-warnings=0', '--quiet', '**/*.ts', '**/*.tsx'],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )

    eslint_output = eslint_result.stdout.decode()

    # Run ESLint with --fix --dry-run to get fix suggestions
    eslint_fix_result = subprocess.run(
        ['npx', 'eslint', '--fix', '--dry-run', '--format', 'stylish', '**/*.ts', '**/*.tsx'],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )

    eslint_fix_output = eslint_fix_result.stdout.decode()

    # If there are any ESLint errors, return them along with fix suggestions
    if eslint_output:
        return "needs_improvement", f"### ESLint Issues Found:\n```\n{eslint_output}\n```\n" \
                                    f"### Suggested Fixes:\n```\n{eslint_fix_output}\n```"
    
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
