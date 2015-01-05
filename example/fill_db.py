from wega.db.models import Product


EXAMPLE_PRODUCTS = [
    Product(**{
        'name': 'Khaki Coat',
        'description': '''
            Italian fabric. Slim fit.

            Main: 61% wool 28% polyester 6% acrylic 5% other fibres.
            Lining: 100% polyester.
        ''',
        'image_name': 'coat_uno_300x300.png',
        'price': 257.24,
    }),

    Product(**{
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
        'price': 189.90,
    }),

    Product(**{
        'name': 'Compact Nylon Jacket',
        'description': '''
            Essential jacket, designed in high-shine compact nylon to give a
            two-tone effect. Finished with black branded trim.

            This jacket is designed in high-shine compact nylon to give a
            two-tone effect. Finished with black branded trim.

            Main, lining and wadding 100% polyester.
        ''',
        'image_name': 'trojka_300x300.png',
        'price': 298.70,
    }),

    Product(**{
        'name': 'Wadded Jacket',
        'description': '''
            Essential navy wadded jacket with contrast white zip detailing.

            100% polyester.
        ''',
        'image_name': 'wadded_300x300.png',
        'price': 152.00,
    }),

    Product(**{
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
        'price': 137.30,
    }),

    Product(**{
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
        'price': 210.00,
    }),

    Product(**{
        'name': 'Tapue Covert Coat',
        'description': '''100% British wool.''',
        'image_name': 'tapue_covert_300x300.png',
        'price': 215.15,
    }),

    Product(**{
        'name': 'Fleeced Lined Anorak',
        'description': '''
            Stylish red anorak with contrast white trim detailing and snug
            fleece lining.

            65% polyester 35% cotton. Upper lining 100% cotton. Sleeve and
            lower lining 100% polyester.''',
        'image_name': 'fleeced_anorak_300x300.png',
        'price': 89.00,
    }),

    Product(**{
        'name': 'Coat',
        'description': '',
        'image_name': '',
        'price': 19.99,
    }),
]


def fill_products(db):
    for product in EXAMPLE_PRODUCTS:
        db.session.add(product)
    db.session.commit()
