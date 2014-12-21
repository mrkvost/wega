#!/usr/bin/env python

import os
import sys

username, password = os.environ['GIT_AUTH'].split(':', 1)
if sys.argv[1].startswith('Username'):
    print username
else:
    print password

