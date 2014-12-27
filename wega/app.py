import logging

from flask import Flask

from wega.views.base import base_app
from wega.views.products import products_app
from wega.views.order import order_app


app = Flask(__name__)
app.config.from_object('wega.commonsettings')
app.config.from_object('settings')

app.register_blueprint(base_app, url_prefix="")
app.register_blueprint(products_app, url_prefix="/products")
app.register_blueprint(order_app, url_prefix="/order")


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    app.run(host='0.0.0.0', debug=True)
