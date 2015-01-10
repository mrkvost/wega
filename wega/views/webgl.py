from flask import Blueprint, render_template, url_for


webgl_app = Blueprint('webgl', __name__)


@webgl_app.route('/threejs')
def threejs():
    return render_template('webgl-threejs.html')


@webgl_app.route('/x3dom')
def x3dom():
    return render_template('webgl-x3dom.html')
