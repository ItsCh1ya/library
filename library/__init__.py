import imp
from flask import Flask
from library.backend.db import create_connection

app = Flask(__name__, static_folder="static/assets", template_folder="static")
connection = create_connection("db.sqlite")

from library.views import *
from library.backend.api import *