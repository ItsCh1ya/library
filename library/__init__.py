from flask import Flask
from pymongo import MongoClient

app = Flask(__name__, static_folder="static/assets", template_folder="static")
db = MongoClient().library

from library.views import *
from library.backend.api import *