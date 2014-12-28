from flask import Blueprint, render_template

from wega.utils import set_active_navigation


products_app = Blueprint('products', __name__)


@products_app.before_request
def before_request():
    set_active_navigation('products')


@products_app.route('')
def index():
    return render_template('products.html')
