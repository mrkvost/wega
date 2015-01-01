from flask import Blueprint, render_template

from wega.utils import navigation


base_app = Blueprint('base', __name__)


@base_app.route('/')
@navigation(body_id='home')
def home():
    return render_template('home.html')


@base_app.route('/contact')
@navigation(body_id='contact')
def contact():
    return render_template('contact.html')


@base_app.route('/about')
@navigation(body_id='about')
def about():
    return render_template('about.html')


@base_app.route('/login', methods=['GET', 'POST'])
@navigation(body_id='login')
def login():
    return render_template('login.html')
