from flask import Blueprint, render_template


base_app = Blueprint('base', __name__)


@base_app.route('/')
def home():
    return render_template('home.html')


