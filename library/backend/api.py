from crypt import methods
from library import app
from library.backend.db import create_connection
from flask import request, jsonify

@app.route("/api/save_book", methods=["POST", "PUT"])
def api_save_book():
    requested_json = request.json
    connection = create_connection("db.sqlite")
    cur = connection.cursor()
    cur.execute(f"INSERT INTO books(title,author,year,url) VALUES (?, ?, ?, ?)", (requested_json['title'], requested_json['author'], requested_json['year'], requested_json['url']))
    connection.commit()
    return jsonify({"status":"success", "description":"Book successfuly added to db"})

@app.route("/api/delete_book", methods=["POST"])
def api_delete_book():
    requested_json = request.json
    connection = create_connection("db.sqlite")
    cur = connection.cursor()
    cur.execute("DELETE FROM books WHERE id = ?;", (requested_json['id'], ))
    connection.commit()
    return jsonify({"status":"success", "description":"da"})

@app.route("/api/get_all_books")
def api_get_all_books():
    cur = create_connection("db.sqlite").cursor()
    all_books = cur.execute("select * from books")
    return jsonify(list(all_books))

@app.route("/api/edit_book", methods=["POST"])
def api_edit_book():
    requested_json = request.json
    connection = create_connection("db.sqlite")
    cur = connection.cursor()
    cur.execute(f"""
        UPDATE books
        SET title = ?, author = ?, year = ?, url = ?
        WHERE id = ?;
    """, (requested_json['title'], requested_json['author'], requested_json['year'], requested_json['url'], requested_json['id']))
    connection.commit()
    return jsonify({"status":"success", "description":"da"})