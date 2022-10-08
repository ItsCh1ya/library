from library import app
from flask import send_from_directory

@app.route('/<path:path>')
def send_report(path):
    return send_from_directory('reports', path)