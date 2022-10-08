from flask import Flask

app = Flask(__name__, static_folder="static/assets", template_folder="static")

from library.views import *