import os.path

from flask import Blueprint, render_template, url_for

from wega.utils import set_active_navigation


products_app = Blueprint('products', __name__)


@products_app.before_request
def before_request():
    set_active_navigation('products')


class Product(object):
    IMAGE_PATH = 'img/products'

    def __init__(self, **kwargs):
        self.id = kwargs.get('id')
        self.name = kwargs.get('name')
        self.description = kwargs.get('description')
        self.image_name = kwargs.get('image_name')

    @property
    def image_url(self):
        path = os.path.join(self.IMAGE_PATH, self.image_name)
        return url_for('static', filename=path)

    def __str__(self):
        return 'Product(id={0:d}, name="{1:s}", image_name="{2:s}")'.format(
            self.id, self.name, self.image_name)


PRODUCTS = [
    Product(**{
        'id': 1,
        'name': 'Khaki Coat',
        'description': '''
            Italian fabric. Slim fit.

            Main: 61% wool 28% polyester 6% acrylic 5% other fibres.
            Lining: 100% polyester.
        ''',
        'image_name': 'coat_uno_300x300.png',
    }),
    Product(**{
        'id': 2,
        'name': 'Waistcoat jacket',
        'description': '''
            Traditional herringbone jacket with two-button fastening, centre
            vent, notch lapel, flap pockets, ticket pocket, under-collar
            contrast fabric and removable cotton pocket hanky. Finished off
            with a printed lining, complemented by a 100% cotton pocket square.

            Dry clean only.
            55% wool 45% polyester. Lining 100% polyester.
            Maximum 99% wool is used in these products and a minimum of 50%
            wool.
        ''',
        'image_name': 'sako_duo_300x300.png',
    }),
    Product(**{
        'id': 3,
        'name': 'Compact Nylon Jacket',
        'description': '''
            Essential jacket, designed in high-shine compact nylon to give a
            two-tone effect. Finished with black branded trim.

            This jacket is designed in high-shine compact nylon to give a
            two-tone effect. Finished with black branded trim.

            Main, lining and wadding 100% polyester.
        ''',
        'image_name': 'trojka_300x300.png',
    }),
    Product(**{
        'id': 4,
        'name': 'Wadded Jacket',
        'description': '''
            Essential navy wadded jacket with contrast white zip detailing.

            100% polyester.
        ''',
        'image_name': 'wadded_300x300.png',
    }),
    Product(**{
        'id': 5,
        'name': 'Pea Coat',
        'description': '''
            Contemporary pea coat that's a true outerwear staple. Complete with
            a double-breasted front panel and broad lapels, this slim-fit
            jacket will stick around for years to come. Designed with anchor
            brand buttons, versatile slashed pockets and enriched internals.

            Main: 60% wool 31% polyester 9% other fibres. Lining: 100%
            polyester.

            Maximum 99% wool is used in these products and a minimum of 50%
            wool.
        ''',
        'image_name': 'pea_coat_300x300.png',
    }),
    Product(**{
        'id': 6,
        'name': 'Single Breasted Mac',
        'description': '''
            Versatile slim-fit mac that's a true outerwear staple. Complete
            with water-repellent outer fabric and featuring a single-breasted
            front panel and premium Corozo buttons, this jacket is enhanced
            with a wadded lining for extra warmth and will stick around for
            years to come.

            63% cotton 28% polyester 9% nylon. Lining 100% polyester.
        ''',
        'image_name': 'single_breasted_mac_300x300.png',
    }),
    Product(**{
        'id': 7,
        'name': 'Tapue Covert Coat',
        'description': '''100% British wool.''',
        'image_name': 'tapue_covert_300x300.png',
    }),
    Product(**{
        'id': 8,
        'name': 'Fleeced Lined Anorak',
        'description': '''
            Stylish red anorak with contrast white trim detailing and snug
            fleece lining.

            65% polyester 35% cotton. Upper lining 100% cotton. Sleeve and
            lower lining 100% polyester.''',
        'image_name': 'fleeced_anorak_300x300.png',
    }),
]

@products_app.route('')
def index():
    products = PRODUCTS
    return render_template('products.html', products=products)
