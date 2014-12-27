from flask import Blueprint, render_template


base_app = Blueprint('base', __name__)


@base_app.route('/')
def home():
    return render_template('home.html')


@base_app.route('/contact')
def contact():
    return render_template('contact.html')


@base_app.route('/about')
def about():
    return render_template('about.html')


@base_app.route('/login')
def login():
    return render_template('login.html')
