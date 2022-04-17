# IMPORTS
from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
import json
import random

# GLOBALS
HOST = "127.0.0.1"
PORT = 5000
DEBUG_MODE = True
JSON_FILE = "storage.json"
MAX_ID = 69420

# APP INITIALIZATION
app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

# Helper function to read storage.json file
def read_storage():
    with open(JSON_FILE) as f:
        data = json.load(f)

    return data

@app.route("/")
def index():
    return "Hello World"

@app.route("/getTodos")
def get_todos():
    """ Get a list of todo objects.
    """
    try:
        todos = read_storage()["todos"]
        return {"status": 200, "message": "Get Success", "data": todos}

    except:
        return {"status": 500, "message": "Request Failed"}

@app.route("/create", methods=["POST"])
def create_todo():
    """ Creates a todo object.
        Requires name field.
    """
    parser = reqparse.RequestParser()
    parser.add_argument("name", type=str)

    try:
        args = parser.parse_args()
        data = read_storage()
        todos = data["todos"]
        
        todo_id = random.randint(1, MAX_ID)
        while todo_id in todos:
            todo_id = random.randint(1, MAX_ID)

        todos.append({"id": todo_id, "name": args["name"]})

        with open(JSON_FILE, "w") as f:
            f.write(json.dumps(data, indent=4))

        return {"status": 200, "message": "Create Success"}

    except:
        return {"status": 500, "message": "Request Failed"}

@app.route("/deleteTodo", methods=["POST"])
def delete_todo():
    """ Deletes a todo object.
        Requires id field.
    """
    parser = reqparse.RequestParser()
    parser.add_argument("id", type=int)

    try:
        args = parser.parse_args()
        data = read_storage()
        delete_id = args["id"]
        print(delete_id)

        data["todos"] = [ todo for todo in data["todos"] if todo["id"] != delete_id ]

        with open(JSON_FILE, "w") as f:
            f.write(json.dumps(data, indent=4))

        return {"status": 200, "message": "Delete Success"}

    except:
        return {"status": 500, "message": "Request Failed"}

if __name__ == "__main__":
    app.run(HOST, PORT, debug=DEBUG_MODE)