#!/usr/bin/python2.7

import os
import sys
import random


root = os.path.dirname(__file__)
sys.path.insert(0, root)


from flask.ext.script import (
    Shell,
    Manager,
    Command,
)


from wega.app import app
from wega.db.core import db
from wega.db.models import Product

from example.fill_db import fill_products


class Recreate(Command):
    '''Delete all tables in db and create new tables based on models.'''

    def run(self):
        db.app = app
        db.drop_all()
        db.create_all()

        fill_products(db)


manager = Manager(lambda: app)
manager.add_command('shell', Shell(use_ipython=True))
manager.add_command('recreate', Recreate())


if __name__ == '__main__':
    manager.run()
