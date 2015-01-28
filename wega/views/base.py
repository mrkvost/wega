from flask import Blueprint, render_template, request

from wega.forms import LoginForm


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


@base_app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm(formdata=request.form)
    if form.validate_on_submit():
        # TODO: redirect, login user and create session
        return render_template('login.html', form=form)
    return render_template('login.html', form=form)


@base_app.route('/sizes')
def sizes():
    return render_template('sizes.html')


@base_app.route('/income')
def income():
    return render_template('income.html')
