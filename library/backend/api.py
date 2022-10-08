from turtle import title
from library import app
from library.backend.db import create_connection
from flask import request, jsonify

@app.route("/api/save_book")
def api_save_book():
    requested_json = request.json
    cur = create_connection("db.sqlite").cursor()
    cur.execute(f"INSERT INTO tmp(title,author,year) VALUE ({requested_json['title']}, {requested_json['author']}, {requested_json['year']})")
    return jsonify({"status":"success", "description":"Book successfuly added to db"})

@app.route("/api/get_all_books")
def api_get_all_books():
    connection = create_connection("db.sqlite")
    cur = connection.cursor()
    all_books = cur.execute("select * from books")
    return jsonify(list(all_books))