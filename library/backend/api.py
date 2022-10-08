from library import app
from flask import request, jsonify

@app.route("/api/save_book")
def api_save_book():
    requested_json = request.json