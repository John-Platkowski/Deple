from pymongo import MongoClient
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from google import genai
from flask_cors import CORS
import re
import threading
import time



load_dotenv()

#set up flask  with name as app
app = Flask(__name__)

CORS(app, origins=[os.getenv("FRONT_END")])

#get infromation from mongoDB client
mongo_client = MongoClient(os.getenv("MONGO_DB"))
db = mongo_client["db"]
aliens = db["Aliens"]
scenarios = db["Scenarios"]
daily_scenario = 1
planets = db["Planets"]

INTER_CALL_DELAY_SECONDS = 4  # ~15 RPM safe margin for Gemini free tier
_hints_lock  = threading.Lock()
_hints_ready = threading.Event()   # set once hints are fully generated
_steelmans_lock  = threading.Lock()
_steelmans_ready = threading.Event()

PREFERRED_RE = re.compile(r'^\s*preferred\s*:\s*(\d+)\s*$', re.IGNORECASE)

alien_hints = {}
#hints:
# alien_id : [
#   {
#       planet_id : planet_hint,
#       planet_id2 : planet_hint2,
#    }
# ],
# alien_id2 (...)


alien_steelmans = {}
# alien_id : steelman_string



alien_alignments = {}
#alignments:
# alien_id : preferred_planet_id
# alien_id2 (...)

# The client gets the API key from the environment variable `GEMINI_API_KEY`.
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)
MODEL = "models/gemma-3-1b-it"



def _ensure_hints():
    """Block until alien_hints is populated, generating it at most once."""
    if _hints_ready.is_set():          # fast path — already done
        return
    acquired = _hints_lock.acquire(blocking=True)
    try:
        if not _hints_ready.is_set():  # double-check under lock
            generate_alien_hints()
            _hints_ready.set()
    finally:
        _hints_lock.release()


def _ensure_steelmans():
    """Block until alien_steelmans is populated, generating it at most once."""
    if _steelmans_ready.is_set():
        return
    acquired = _steelmans_lock.acquire(blocking=True)
    try:
        if not _steelmans_ready.is_set():
            generate_alien_steelmans()
            _steelmans_ready.set()
    finally:
        _steelmans_lock.release()



@app.route("/hint", methods=["POST"])
def get_hint():
    #_ensure_hints()
    global alien_hints
    alien_id = request.args.get('id')
    planet_id = request.args.get('planet_id')
    hint = (alien_hints.get(alien_id) or {}).get(planet_id)
    if hint is None:
        return jsonify({"error": "Not found"}), 404
    return jsonify({"hint": hint})

# @app.route("/correct", methods=["POST"])
# def get_correct():
#     if not alien_hints:
#         alien_hints = generate_alien_hints()
#     alien_id = request.args.get('id')
#     planet_id = request.args.get('planet_id')
#     return alien_alignments.get(alien_id) == planet_id

@app.route("/correct", methods=["POST"])
def get_correct():
    #_ensure_hints()
    global alien_alignments
    data = request.get_json() 
    alien_id = data.get('alien_id')
    planet_id = data.get('planet_id')
    result = alien_alignments.get(alien_id) == planet_id
    return jsonify({ "isCorrect": result })
    
@app.route("/steelman", methods=["GET"])
def get_steelman():
    global alien_steelmans
    #_ensure_steelmans
    alien_id = request.args.get('id')
    steelman = alien_steelmans.get(alien_id)
    if steelman is None:
        return jsonify({"error": "Alien not found"}), 404
    return jsonify({"steelman": steelman})

#get_planets() ->
#   [
#       {
#           "_id": 1,
#           "name": "Order and Control",
#           "description": "Strict rules and monitoring..."
#       },
#       {
#           "_id": 2,
#           "name": "Care and Support",
#           "description": "Community help..."
#       },
#       {
#           "_id": 3,
#           "name": "Work and Duty",
#           "description": "Structured roles..."
#       }
#   ]


def _get_planets():
    global scenarios
    global daily_scenario
    result = list(scenarios.aggregate([
        { "$match": { "_id": daily_scenario } },
        {
            "$lookup": {
                "from": "Planets",
                "localField": "planet_options",
                "foreignField": "_id",
                "as": "planets"
            }
        }
    ]))
    return result[0]["planets"]

@app.route("/planets", methods=["GET"])
def get_planets():
    global scenarios
    global daily_scenario
    result = list(scenarios.aggregate([
        {
            "$match": { "_id": daily_scenario }
        },
        {
            "$lookup": {
                "from": "Planets",
                "localField": "planet_options",
                "foreignField": "_id",
                "as": "planets"
            }
        }
    ]))
    return jsonify(result[0]["planets"])

@app.route("/scenario", methods=['GET'])
def get_scenario():
    scenario = scenarios.find_one({"_id": 1})
    return jsonify(scenario)

# EXAMPLE SCENARIO:
# Profile: Catheron
# Ideology: A technocratic accelerationist who favors rapid innovation, data-driven governance, and open global markets.
# Traits: Raised in a lower-tier sector, works in sanitation. Values efficiency and practical systems.
# Situation: A neighbor Deple has fallen under the poverty line. What should the planet do?
# Planets:
# 1: Tax all Deples to ensure no Deple falls behind.
# 2: Let market forces determine Deple's economic path forward.
# 3: Have a company hire them to ensure positive income.
def generate_alien_hints():
    global alien_hints, alien_alignments
    global scenarios
    global aliens
    global daily_scenario
    planet_list = _get_planets()
    scenario_doc = scenarios.find_one({"_id": daily_scenario})

    planet_options_str = "\n".join(
        f"{i+1}. {p['name']} - {p['description']}"
        for i, p in enumerate(planet_list)
    )

    for i, alien in enumerate(aliens.find({})):
        if not alien:
            continue
        if i > 0:
            time.sleep(INTER_CALL_DELAY_SECONDS)

        alien_id   = str(alien.get("_id"))
        name       = alien.get("name")
        political  = alien.get("political_ideology")
        traits     = alien.get("traits")

        prompt = f"""
You are an alien decision system for an epistemology game app.

A situation on a planet is given. The society at each planet will respond to the situation in different ways. 
You are responsible for generating a given alien's response to each planet's decision in the form of a hint.
This should only be a hint for the user at how the alien would respond, not a steelman of their position, nor an a-priori justification.
You are not allowed to create new planet options, only responses.

ALIEN PROFILE:
- Name: {name}
- Political ideology: {political}
- Traits: {traits}

SITUATION:
{scenario_doc}

PLANET OPTIONS:
{planet_options_str}

INSTRUCTIONS:
- For EACH planet, give ONE short reaction the alien would have to that planet's approach (max 10 words)
- Write it as the alien's gut feeling or instinct, not a reasoned argument
- Don't explicitly reference the political ideology
- No extra text
- If no values directly align, select the option that most closely aligns.

OUTPUT FORMAT:
id1: Reaction1
id2: Reaction2
id3: Reaction3
Preferred: PreferredPlanetID

EXAMPLE RESPONSE:
1: Dragging everyone down doesn't pull anyone up.
2: The system works if you let it breathe.
3: You can't patch something by breaking how it works.
Preferred: 2
"""
        
        hint = client.models.generate_content(
            model=MODEL,
            contents=prompt
        )
        # Parse "1: Reason\n2: Reason\n3: Reason" → { planet_id: reason }
        planet_hint_dict = {}
        for line in hint.text.strip().splitlines():
            line = line.strip()
            if not line:
                continue

            preferred_match = PREFERRED_RE.match(line)
            if preferred_match:
                try:
                    planet = planet_list[int(preferred_match.group(1)) - 1]
                    alien_alignments[alien_id] = str(planet["_id"])
                except (ValueError, IndexError):
                    continue
            elif ":" in line:
                idx_str, _, reason = line.partition(":")
                try:
                    planet = planet_list[int(idx_str.strip()) - 1]
                    planet_hint_dict[str(planet["_id"])] = reason.strip()
                except (ValueError, IndexError):
                    continue
        alien_hints[alien_id] = planet_hint_dict
        print(f"=== ALIEN: {alien_id} ===")
        print(hint.text)
        print(f"=== END ===")
    return alien_hints





def generate_alien_steelmans():
    global alien_steelmans
    global aliens
    global scenarios
    global daily_scenario
    global alien_hints, alien_alignments 

    if not alien_alignments:
        generate_alien_hints()

    planet_list = _get_planets()
    planet_lookup = {str(p["_id"]): p for p in planet_list}
    scenario_doc = scenarios.find_one({"_id": daily_scenario})

    for i, alien in enumerate(aliens.find({})):
        if not alien:
            continue
        if i > 0:
            time.sleep(INTER_CALL_DELAY_SECONDS)

        alien_id  = str(alien.get("_id"))
        name      = alien.get("name")
        political = alien.get("political_ideology")
        traits    = alien.get("traits")

        chosen_planet_id = alien_alignments.get(alien_id)
        if not chosen_planet_id:
            continue

        chosen_planet = planet_lookup.get(chosen_planet_id)
        if not chosen_planet:
            continue

        chosen_planet_name        = chosen_planet["name"]
        chosen_planet_description = chosen_planet["description"]

        prompt = f"""
You are an alien decision system for an epistemology game app.

A situation on a planet is given. Each alien has chosen the planet whose approach best aligns with their worldview.
You are responsible for generating the strongest possible argument defending why a specific alien chose the planet they did.
This should be a sincere, charitable steelman of their decision — not a gut reaction, but the best principled case for their choice.

ALIEN PROFILE:
- Name: {name}
- Political ideology: {political}
- Traits: {traits}

SITUATION:
{scenario_doc}

CHOSEN PLANET:
{chosen_planet_name} - {chosen_planet_description}

INSTRUCTIONS:
- Write the strongest argument this alien could make to justify choosing this planet's approach (max 30 words)
- Frame it as a principled, reasoned case colored by the alien's worldview
- Do not explicitly reference the alien's political ideology by name
- Do not dismiss or undermine the chosen planet's position; steelman it sincerely
- No extra text, just the argument
- Make absolutely certain no additional tokens are added beyond or outside the format.

EXAMPLE SCENARIO:
Profile: Catheron
Ideology: A technocratic accelerationist who favors rapid innovation, data-driven governance, and open global markets.
Traits: Raised in a lower-tier sector, works in sanitation. Values efficiency and practical systems.
Situation: A neighbor Deple has fallen under the poverty line. What should the planet do?
Chosen Planet: Let market forces determine Deple's economic path forward.

EXAMPLE RESPONSE:
When individuals respond to real conditions rather than imposed plans, resources tend get allocated where they're genuinely needed — even if the path looks messy from the outside.
"""

        result = client.models.generate_content(
            model=MODEL,
            contents=prompt
        )

        alien_steelmans[alien_id] = result.text.strip()
        print(f"=== ALIEN: {alien_id} ===")
        print(result.text)
        print(f"=== END ===")
    return alien_steelmans










@app.route("/model")
def model():

    models = client.models.list()

    text_result = "Available models:\n\n"

    for m in models:
        text_result += f"- {m.name}\n"

    return text_result


# #This will return all the information in a nice HTML format
# @app.route("/alienTable")
# def table():
#     aliens = aliens.find({})

#     html = "<h1>Alien Ideologies</h1><ul>"

#     for alien in aliens:
#         html += f"""
#         <li>
#             <h2>{alien.get('name')}</h2>
#             <p><strong>Political:</strong> {alien.get('political_ideology')}</p>
#             <p><strong>Moral:</strong> {alien.get('moral_ideology')}</p>
#         </li>
#         """

#     html += "</ul>"
#     return html

#This will return infromation in a json format
@app.route("/aliens", methods = ['GET'])
def find_aliens():
    global aliens
    cursor = aliens.find({})

    result = {}

    for alien in cursor:
        result[str(alien["_id"])] = {
            "name": alien.get("name"),
            "traits": alien.get("traits"),
            "image": alien.get("image")
        }

    return jsonify(result)

# #What the basic root looks like
# @app.route("/")
# def root():

#     pages = [
#         {"name": "Alien Table (HTML)", "url": "/alienTable"},
#         {"name": "Alien Data (JSON)", "url": "/aliens"},
#         {"name": "Generate", "url": "/generate"}
#     ]

#     html = "<h1>Alien API Dashboard</h1><p>Select a page:</p><ul>"

#     for page in pages:
#         html += f"""
#         <li>
#             <a href="{page['url']}">
#                 <button>{page['name']}</button>
#             </a>
#         </li>
#         """

#     html += "</ul>"

#     return html

#access from http://127.0.0.1:5000/
#app.run(host="0.0.0.0", port=5000)

# @app.route("/change_scene", methods=["GET"])
# def change_scene():
#     #_ensure_hints()
#     global daily_scenario
#     daily_scenario = 3 - daily_scenario 
#     threading.Thread(target=_warm_all, daemon=True).start()
#     return str(daily_scenario)

def _warm_all():
    _ensure_hints()
    _ensure_steelmans()

if __name__ == "__main__":
    threading.Thread(target=_warm_all, daemon=True).start()
    app.run(debug=True, host="0.0.0.0", port=5000)