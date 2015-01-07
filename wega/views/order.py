from flask import Blueprint, render_template


order_app = Blueprint('order', __name__)


@order_app.route('')
def index():
    return render_template('order.html')
