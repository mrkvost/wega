from functools import wraps

from flask import g


def set_active_navigation(body_id):
    navigation = {
        'home': '',
        'products': '',
        'order': '',
        'contact': '',
        'about': '',
        'login': '',
    }
    navigation[body_id] = 'active'
    g.navigation = navigation


def navigation(body_id=''):
    def decorator(func):
        @wraps(func)
        def wrapped(*args, **kwargs):
            g.body_id = body_id
            set_active_navigation(body_id)
            return func(*args, **kwargs)
        return wrapped
    return decorator
