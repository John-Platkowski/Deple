from pymongo import MongoClient
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from google import genai

load_dotenv()

#set up flask  with name as app
app = Flask(__name__)

#get infromation from mongoDB client
client = MongoClient(os.getenv("MONGO_DB"))
db = client["Aliens"]
collection = db["Ideology"]

app = Flask(__name__)

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)

@app.route("/generate_response", methods=["GET"])
def generate():
    alien_id = request.args.get("id")
    planet_ideology = request.args.get("planet")
    scenario = request.args.get("scenario")

    alien = collection.find_one({"_id": int(alien_id)})

    if not alien:
        return jsonify({"error": "Alien not found"}), 404

    name = alien.get("name")
    political = alien.get("political_ideology")
    moral = alien.get("moral_ideology")

    prompt = f"""
You are an alien decision system.

You MUST choose exactly ONE option from the list below.
You are not allowed to create new answers.

ALIEN PROFILE:
- Name: {name}
- Political ideology: {political}
- Moral ideology: {moral}

SITUATION:
{scenario}

PLANET OPTIONS (choose only one):
1. StrongPolicing - strict rules and enforcement of behavior
2. SocialSupport - community help and social integration
3. WorkPlacement - structured jobs and responsibilities

INSTRUCTIONS:
- Choose EXACTLY ONE option number (1, 2, or 3)
- Then give ONE short reason (max 10 words)
- No extra text

OUTPUT FORMAT:
OptionNumber: Reason

EXAMPLE:
2: values cooperation and community support
"""

    response = client.models.generate_content(
        model="models/gemma-3-1b-it",
        contents=prompt
    )

    return response.text

@app.route("/model")
def model():

    models = client.models.list()

    text_result = "Available models:\n\n"

    for m in models:
        text_result += f"- {m.name}\n"

    return text_result


#This will return all the information in a nice HTML format
@app.route("/alienTable")
def table():
    aliens = collection.find({})

    html = "<h1>Alien Ideologies</h1><ul>"

    for alien in aliens:
        html += f"""
        <li>
            <h2>{alien.get('name')}</h2>
            <p><strong>Political:</strong> {alien.get('political_ideology')}</p>
            <p><strong>Moral:</strong> {alien.get('moral_ideology')}</p>
        </li>
        """

    html += "</ul>"
    return html

#This will return infromation in a json format
@app.route("/aliens")
def aliens():
    aliens = collection.find({})

    result = {}

    for alien in aliens:
        result[str(alien["_id"])] = {
            "name": alien.get("name"),
            "political_ideology": alien.get("political_ideology"),
            "moral_ideology": alien.get("moral_ideology")
        }

    return jsonify(result)

#What the basic root looks like
@app.route("/")
def root():

    pages = [
        {"name": "Alien Table (HTML)", "url": "/alienTable"},
        {"name": "Alien Data (JSON)", "url": "/aliens"},
        {"name": "Generate", "url": "/generate"}
    ]

    html = "<h1>Alien API Dashboard</h1><p>Select a page:</p><ul>"

    for page in pages:
        html += f"""
        <li>
            <a href="{page['url']}">
                <button>{page['name']}</button>
            </a>
        </li>
        """

    html += "</ul>"

    return html

#access from http://127.0.0.1:5000/
app.run(host="0.0.0.0", port=5000)


if __name__ == "__main__":
    app.run(debug=True)
