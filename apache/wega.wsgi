import os
import sys
import logging

logging.basicConfig(level=logging.DEBUG)

root = os.path.join(os.path.dirname(__file__), '..')
sys.path.insert(0, root)

from wega.app import app as application
