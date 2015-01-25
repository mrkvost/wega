import os.path

from flask import Blueprint, render_template, url_for

from wega.db.core import db
from wega.db.models import Product


IMAGE_PLACEHOLDER_SMALL = 'holder.js/300x300/#333:#fff/text:missing image'
IMAGE_PATH = 'img/products'


def image_url(image_name):
    if not image_name:
        return ''
    path = os.path.join(IMAGE_PATH, image_name)
    return url_for('static', filename=path)


products_app = Blueprint('products', __name__)


@products_app.context_processor
def inject_context():
    return dict(
        image_url=image_url,
        image_placeholder_small=IMAGE_PLACEHOLDER_SMALL
    )


@products_app.route('')
def index():
    products = Product.query.all()
    return render_template('products.html', products=products)


@products_app.route('/<int:product_id>')
def product(product_id):
    product = Product.query.get_or_404(product_id)

    return render_template('product_detail.html', product=product)
