from flask import Blueprint, render_template, url_for


webgl_app = Blueprint('webgl', __name__)


@webgl_app.route('/')
def index():
    return render_template('webgl.html')
