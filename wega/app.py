import logging

from flask import Flask

from wega.views.base import base_app


app = Flask(__name__)
app.config.from_object('wega.commonsettings')
app.config.from_object('settings')

app.register_blueprint(base_app, url_prefix="")


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    app.run(host='0.0.0.0', debug=True)
