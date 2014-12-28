from flask import Blueprint, render_template

from wega.utils import set_active_navigation


order_app = Blueprint('order', __name__)


@order_app.before_request
def before_request():
    set_active_navigation('order')


@order_app.route('')
def index():
    return render_template('order.html')
