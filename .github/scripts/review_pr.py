import os
import random
import requests
import subprocess

token = os.getenv("GITHUB_TOKEN")
pr_number = os.getenv("GITHUB_EVENT_PULL_REQUEST_NUMBER")

headers = {
    "Authorization": f"Bearer {token}",
    "Accept": "application/vnd.github.v3+json"
}

messages = {
    "good": [
        "# **This PR looks delicious! 😋🍴**",
        "# **This PR is well seasoned and cooked to perfection! 🔥👌**",
        "# **Yum! This PR is just right! 😍🍲**",
        "# **The code is a gourmet masterpiece! 👨‍🍳🌟**",
        "# **This PR is a Michelin-star dish! ⭐🍽️**",
        "# **Perfectly balanced flavors! Uh, I mean, code! 🏆👨‍💻**",
        "# **Like a well baked soufflé, this PR has risen to perfection! 🍮🎉**",
        "# **The ingredients blend together beautifully! 🍲💖**",
        "# **This PR is as smooth as melted butter! 🧈✨**",
        "# **Delicious! This code deserves a chef’s kiss! 👨‍🍳💋**",
        "# **This PR is as satisfying as a perfectly brewed coffee! ☕✅**",
        "# **No bugs, no mess. Just clean, elegant code! 🍷🖥️**"
    ],
    "needs_improvement": [
        "# **This PR could use a little more spice! 🌶️⚡**",
        "# **The code is almost perfect, just add a pinch of salt! 🧂💡**",
        "# **Tasty code, but let’s add some extra flavor! 🍛✨**",
        "# **It’s a bit undercooked, let’s reheat it! 🍕🔥**",
        "# **This PR needs a little more simmering! ⏳🔥**",
        "# **It's missing a key ingredient! Let's season it with some fixes! 🧂🔧**",
        "# **Almost there! Just needs a pinch of code cleanup! ✨🍽️**",
        "# **This PR is like a half-baked cake. Good start, but needs more time! 🎂⏳**",
        "# **The flavors are a bit off. Let’s adjust the recipe! 📖👨‍🍳**",
        "# **A few burned edges. Let’s trim them off! 🔥✂️**",
        "# **A little too salty, let’s balance it out! ⚖️🧂**",
        "# **Let’s add some garnish, aka, code improvements! 🍃💻**"
    ],
    "encouragement": [
        "**Keep stirring the pot! Your code is almost there! 🍲💪**",
        "**You’re on the right track! Just a few tweaks needed! 🚂🔧**",
        "**Every chef has room for improvement. Keep it up! 👨‍🍳💖**",
        "**You’re cooking up something great! Keep up the good work! 🔥👨‍🍳**",
        "**You’re doing great! Just a few more ingredients to add! 🍲💪**",
        "**You’ve got this! Let’s make your PR shine!🌟**",
        "**You’re almost there! Just a few more touches needed! 🎨✨**",
        "**You're on the right path! Just a few more spices to add! 🌶️🔧**",
    ]
}

def analyze_code():
    eslint_result = subprocess.run(
        ['npx', 'eslint', '--max-warnings=0', '--quiet', '**/*.ts', '**/*.tsx'],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )

    eslint_output = eslint_result.stdout.decode()

    if eslint_output:
        encouragement_message = random.choice(messages["encouragement"])
        eslint_output = f"Here's a list of what we need to fix before serving this PR:\n\n" \
                        f"```bash\n{eslint_output}\n```\n" \
                        f"{encouragement_message}"

        return "needs_improvement", eslint_output

    return "good", "🍽️ **This code ready for serving!** 🍽️\n\n"

def post_comment(message):
    comment_url = f"https://api.github.com/repos/{os.getenv('GITHUB_REPOSITORY')}/issues/{pr_number}/comments"
    response = requests.post(comment_url, json={"body": message}, headers=headers)
    return response

def main():
    status, analysis_result = analyze_code()

    if status == "good":
        message = random.choice(messages["good"]) + "\n\n" + analysis_result
    else:
        message = random.choice(messages["needs_improvement"]) + "\n\n" + analysis_result

    response = post_comment(message)

    if response.status_code == 201:
        print("Comment posted successfully!")
    else:
        print(f"Failed to post comment. Status code: {response.status_code}, Response: {response.text}")

if __name__ == "__main__":
    main()
