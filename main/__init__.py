from flask import Blueprint

# Create the `main` blueprint.
main = Blueprint('main', __name__)

from main import controllers
