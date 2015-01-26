from wega.db.models import Product, Fiber, Composition


EXAMPLE_FIBERS = [
    Fiber(**{
        'name': 'Other',
        'description': 'Other fibers is used with low quantity of fibers.',
    }),
    Fiber(**{
        'name': 'Polyester',
        'description': 'Polyethylene terephthalate (PET / PETE) is the thermoplastic polymer resin of the polyester family used in synthetic fibers.',
    }),
    Fiber(**{
        'name': 'Wool',
        'description': 'Textile fiber obtained from sheep and certain other animals, including cashmere from goats, mohair from goats, qiviut from muskoxen, angora from rabbits, and other types of wool from camelids.',
    }),
    Fiber(**{
        'name': 'Acrylic',
        'description': 'Acrylic fibers are synthetic fibers made from a polymer (polyacrylonitrile) with an average molecular weight of ~100,000, about 1900 monomer units. Acrylic is lightweight, soft, and warm, with a wool-like feel.',
    }),
    Fiber(**{
        'name': 'Cotton',
        'description': 'Cotton is a soft, fluffy staple fiber that grows in a boll, or protective capsule, around the seeds of cotton plants of the genus Gossypium in the family of Malvaceae. The fiber is almost pure cellulose. The fiber is most often spun into yarn or thread and used to make a soft, breathable textile.',
    }),
    Fiber(**{
        'name': 'Nylon',
        'description': 'Nylon is a thermoplastic, silky material. It is a generic designation for a family of synthetic polymers known generically as aliphatic polyamides.',
    }),
]

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

EXAMPLE_COMPOSITIONS = [
    {
        'product_name': 'Khaki Coat',
        'fibers': [{
                'fiber_name': 'Wool',
                'percentage': 61,
            }, {
                'fiber_name': 'Polyester',
                'percentage': 28,
            }, {
                'fiber_name': 'Acrylic',
                'percentage': 6,
            }, {
                'fiber_name': 'Other',
                'percentage': 5,
            },
        ],
    }, {
        'product_name': 'Waistcoat jacket',
        'fibers': [{
                'fiber_name': 'Wool',
                'percentage': 55,
            }, {
                'fiber_name': 'Polyester',
                'percentage': 45,
            },
        ],
    }, {
        'product_name': 'Compact Nylon Jacket',
        'fibers': [{
                'fiber_name': 'Polyester',
                'percentage': 100,
            },
        ],
    }, {
        'product_name': 'Wadded Jacket',
        'fibers': [{
                'fiber_name': 'Polyester',
                'percentage': 100,
            },
        ],
    }, {
        'product_name': 'Pea Coat',
        'fibers': [{
                'fiber_name': 'Wool',
                'percentage': 60,
            }, {
                'fiber_name': 'Polyester',
                'percentage': 31,
            }, {
                'fiber_name': 'Other',
                'percentage': 9,
            },
        ],
    }, {
        'product_name': 'Single Breasted Mac',
        'fibers': [{
                'fiber_name': 'Cotton',
                'percentage': 63,
            }, {
                'fiber_name': 'Polyester',
                'percentage': 28,
            }, {
                'fiber_name': 'Nylon',
                'percentage': 9,
            },
        ],
    }, {
        'product_name': 'Tapue Covert Coat',
        'fibers': [{
                'fiber_name': 'Wool',
                'percentage': 100,
            },
        ],
    }, {
        'product_name': 'Fleeced Lined Anorak',
        'fibers': [{
                'fiber_name': 'Polyester',
                'percentage': 65,
            }, {
                'fiber_name': 'Cotton',
                'percentage': 35,
            },
        ],
    }, {
        'product_name': 'Coat',
        'fibers': [{
                'fiber_name': 'Wool',
                'percentage': 42,
            }, {
                'fiber_name': 'Cotton',
                'percentage': 25,
            }, {
                'fiber_name': 'Polyester',
                'percentage': 12,
            }, {
                'fiber_name': 'Acrylic',
                'percentage': 9,
            }, {
                'fiber_name': 'Nylon',
                'percentage': 7,
            }, {
                'fiber_name': 'Other',
                'percentage': 5,
            },
        ],
    },
]


def _fill_products(db):
    for product in EXAMPLE_PRODUCTS:
        db.session.add(product)
    db.session.commit()


def _fill_fibers(db):
    for fiber in EXAMPLE_FIBERS:
        db.session.add(fiber)
    db.session.commit()


def _fill_compositions(db):
    for item in EXAMPLE_COMPOSITIONS:
        product = Product.query.filter_by(name=item['product_name']).first()
        for data in item['fibers']:
            fiber = Fiber.query.filter_by(name=data['fiber_name']).first()
            composition = Composition(**{
                'product_id': product.id,
                'fiber_id': fiber.id,
                'percentage': data['percentage'],
            })
            db.session.add(composition)
    db.session.commit()


def fill_db(db):
    _fill_products(db)
    _fill_fibers(db)
    _fill_compositions(db)
