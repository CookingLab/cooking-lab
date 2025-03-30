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
        "**This PR looks delicious! 😋🍴**",
        "**This PR is well-seasoned and cooked to perfection! 🔥👌**",
        "**Yum! This PR is just right! 😍🍲**",
        "**The code is a gourmet masterpiece! 👨‍🍳🌟**",
        "**This PR is a Michelin-star dish! ⭐🍽️**",
        "**Perfectly balanced flavors—uh, I mean, code! 🏆👨‍💻**",
        "**Like a well-baked soufflé, this PR has risen to perfection! 🍮🎉**",
        "**The ingredients blend together beautifully! 🍲💖**",
        "**This PR is as smooth as melted butter! 🧈✨**",
        "**Delicious! This code deserves a chef’s kiss! 👨‍🍳💋**",
        "**This PR is as satisfying as a perfectly brewed coffee! ☕✅**",
        "**No bugs, no mess—just clean, elegant code! 🍷🖥️**"
    ],
    "needs_improvement": [
        "**This PR could use a little more spice! 🌶️⚡**",
        "**The code is almost perfect, just add a pinch of salt! 🧂💡**",
        "**Tasty code, but let’s add some extra flavor! 🍛✨**",
        "**It’s a bit undercooked, let’s reheat it! 🍕🔥**",
        "**This PR needs a little more simmering! ⏳🔥**",
        "**It's missing a key ingredient—let's season it with some fixes! 🧂🔧**",
        "**Almost there! Just needs a pinch of code cleanup! ✨🍽️**",
        "**This PR is like a half-baked cake—good start, but needs more time! 🎂⏳**",
        "**The flavors (code) are a bit off—let’s adjust the recipe! 📖👨‍🍳**",
        "**A few burned edges—let’s trim them off! 🔥✂️**",
        "**A little too salty, let’s balance it out! ⚖️🧂**",
        "**Let’s add some garnish—aka, code improvements! 🍃💻**"
    ]
}

def analyze_code():
    eslint_result = subprocess.run(
        ['npx', 'eslint', '--max-warnings=0', '--quiet', '**/*.ts', '**/*.tsx'],
        stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )

    eslint_output = eslint_result.stdout.decode()

    if eslint_output:
        eslint_output = f"Here's a list of what we need to fix before serving this PR:\n\n" \
                        f"```bash\n{eslint_output}\n```\n" \
                        f"Let's spice it up and perfect this code—like a fine dish! 👨‍🍳✨"

        return "needs_improvement", eslint_output

    return "good", "🍰 **This code is a five-star dessert!** 🍰\n\n" \
                   "Everything is perfectly baked and ready to serve! 🍽️🌟"

def post_comment(message):
    comment_url = f"https://api.github.com/repos/{os.getenv('GITHUB_REPOSITORY')}/issues/{pr_number}/comments"
    response = requests.post(comment_url, json={"body": message}, headers=headers)
    return response

def main():
    status, analysis_result = analyze_code()

    if status == "good":
        message = random.choice(messages["good"])
    else:
        message = random.choice(messages["needs_improvement"]) + "\n\n" + analysis_result

    response = post_comment(message)

    if response.status_code == 201:
        print("Comment posted successfully!")
    else:
        print(f"Failed to post comment. Status code: {response.status_code}, Response: {response.text}")

if __name__ == "__main__":
    main()
