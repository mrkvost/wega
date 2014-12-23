from flask import Blueprint


base_app = Blueprint('base', __name__)


@base_app.route('/')
def index():
    return 'Index Page'


