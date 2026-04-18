Run:

//makes sure can use virtual environment
python -m venv venv

//active virtual environment
venv\Scripts\Activate.ps1

//install all the requirements in requirements.txt
pip install -r requirements.txt

//Take a snapshot of what the dependencies are and save in requirements.txt
pip freeze > requirements.txt

//