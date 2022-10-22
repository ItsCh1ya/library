from library import app, db
from flask import request, jsonify
from bson.json_util import dumps
from bson.objectid import ObjectId

@app.route("/api/save_book", methods=["POST", "PUT"])
def api_save_book():
    requested_json = request.json
    db.books.insert_one({
        "title":requested_json['title'],
        "author":requested_json['author'],
        "year":requested_json['year'],
        "url":requested_json['url']
    })
    return jsonify({"status":"success", "description":"Book successfuly added to db"})

@app.route("/api/del_book", methods=["POST"])
def api_delete_book():
    requested_json = request.json
    db.books.find_one_and_delete({
        "_id":ObjectId(requested_json['id'])
    })
    return jsonify({"status":"success", "description":"Book successfuly deleted from db"})

@app.route("/api/get_all_books")
def api_get_all_books():
    lBooks = db.books.find({})
    return dumps(lBooks)

@app.route("/api/get_books", methods=["POST"])
def api_get_books():
    lBooks = db.books.find({}).skip(request.json['offset']*20).limit(10)
    return dumps(lBooks)

@app.route("/api/get_book", methods=["POST"])
def api_get_book():
    if len(request.json['id']) != 24:
        return {"status":"error", "desctiption":"bruh"}
    dBook = db.books.find_one({"_id":ObjectId(request.json['id'])})
    return dumps(dBook)

@app.route("/api/edit_book", methods=["POST"])
def api_edit_book():
    requested_json = request.json
    db.books.find_one_and_update({
        "_id":ObjectId(requested_json['id'])
    },{
        "$set":{
            "title":requested_json['title'],
            "author":requested_json['author'],
            "year":requested_json['year'],
            "url":requested_json['url']
        }
    })
    return jsonify({"status":"success", "description":"Book successfuly edited in db"})