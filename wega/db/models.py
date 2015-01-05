from wega.db.core import db

from flask.ext.sqlalchemy import BaseQuery, _QueryProperty


class Base(db.Model):
    __abstract__ = True

    def __init__(self, **kwargs):
        for col_name in self.__table__.columns.keys():
            setattr(self, col_name, kwargs.get(col_name))


Base.query_class = BaseQuery
Base.query = _QueryProperty(db)


class Product(Base):
    __tablename__ = 'product'

    id = db.Column(db.Integer, index=True, primary_key=True)
    name = db.Column(db.String(255), index=True, nullable=False)
    price = db.Column(db.Float(precision=2), index=True, nullable=False)
    image_name = db.Column(db.String(255), index=True)
    description = db.Column(db.String(1000))
