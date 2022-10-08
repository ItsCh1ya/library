import imp
from flask import Flask
from library.backend.db import create_connection

app = Flask(__name__, static_folder="static/assets", template_folder="static")
connection = create_connection("db.sqlite")
cur = connection.cursor()
cur.execute("""CREATE TABLE IF NOT EXISTS books(
  id       INTEGER  NOT NULL  PRIMARY KEY  AUTO_INCREMENT,
  title    VARCHAR(255),
  author  VARCHAR(255),
  year    INTEGER
);""")

from library.views import *
from library.backend.api import *