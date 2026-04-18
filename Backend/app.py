from pymongo import MongoClient
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from google import genai
from flask_cors import CORS


load_dotenv()

#set up flask  with name as app
app = Flask(__name__)

CORS(app, origins=[os.getenv("FRONT_END")])

#get infromation from mongoDB client
client = MongoClient(os.getenv("MONGO_DB"))
db = client["db"]
aliens = db["Aliens"]
scenarios = db["Scenarios"]
planets = db["Planets"]

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)

@app.route("/generate_response", methods=["POST"])
# Generate is called once for each alien, where 
def generate():
    alien_id = request.args.get("id")
    scenario = request.args.get("scenario")
    

    alien = aliens.find_one({"_id": int(alien_id)})

    if not alien:
        return jsonify({"error": "Alien not found"}), 404

    name = alien.get("name")
    political = alien.get("political_ideology")
    traits = alien.get("traits")

    
    # Planet responses
    prompt = f"""
You are an alien decision system for an epistemology game app.

A situation on a planet is given. The society at each planet will respond to the situation in different ways. 
You are responsible for generating a given alien's response to each planet's decision. 
This should be a hint for the user at how the alien would respond.
You are not allowed to create new planet options, only responses.

ALIEN PROFILE:
- Name: {name}
- Political ideology: {political}
- Traits: {traits}

SITUATION:
{scenario}

PLANET OPTIONS (choose only one):
1. StrongPolicing - 
2. SocialSupport - community help and social integration
3. WorkPlacement - structured jobs and responsibilities

INSTRUCTIONS:
- For EACH planet, give ONE short reason based on the personal attributes (max 10 words)
- Use the political ideology in this reason, but don't explicitly include anything from it.
- No extra text
- If no values directly align, select the option that most closely aligns.

OUTPUT FORMAT:
1: Reason1
2: Reason2
3: Reason3

EXAMPLE, where 2 is the correct planet:
1: 
2: I value cooperation and community support
3: 
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
    aliens = aliens.find({})

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
@app.route("/aliens", methods = ['GET'])
def find_aliens():
    cursor = aliens.find({})

    result = {}

    for alien in cursor:
        result[str(alien["_id"])] = {
            "name": alien.get("name"),
            "traits": alien.get("traits"),
            "image": alien.get("image")
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
