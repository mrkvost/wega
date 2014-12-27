from flask import Blueprint, render_template


products_app = Blueprint('products', __name__)


@products_app.route('')
def index():
    return render_template('products.html')
