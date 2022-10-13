from library import app, db
from flask import request, jsonify

@app.route("/api/save_book", methods=["POST", "PUT"])
def api_save_book():
    requested_json = request.json
    db.books.insert_one({
        "title":requested_json['title'],
        "author":requested_json['author'],
        "url":requested_json['url']
    })
    return jsonify({"status":"success", "description":"Book successfuly added to db"})

@app.route("/api/get_all_books")
def api_get_all_books():
    all_books = db.books.find({})
    return jsonify(list(all_books))

@app.route("/api/edit_book", methods=["POST"])
def api_edit_book():
    requested_json = request.json
    cur = create_connection("db.sqlite").cursor()
    cur.execute(f"""
        UPDATE books
        SET title = '{requested_json['title']}', author= '{requested_json['author']}, year = {requested_json['year']}, id = {requested_json['id']}', url = {requested_json['url']}
        WHERE id = {requested_json['id']};
    """)