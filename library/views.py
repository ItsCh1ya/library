from library import app
from flask import render_template

@app.route('/')
def view_index():
    return render_template('mainPage.html')

@app.route('/library')
def view_library():
    return render_template('index.html')

@app.route('/create')
def view_create():
    return render_template('create.html')