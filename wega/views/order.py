from flask import Blueprint, render_template

from wega.db.core import db
from wega.db.models import Order, User


IMAGE_PLACEHOLDER_SMALL = 'holder.js/200x300/#333:#fff/text:missing image'
IMAGE_PATH = 'img/products'


order_app = Blueprint('order', __name__)


@order_app.route('')
def index():
    order = Order.query.join(User, aliased=True).\
        filter_by(username='admin').first()
    total = sum([
        item.product.price * item.number for item in order.items
    ])
    return render_template('order.html', order=order, total=total)
