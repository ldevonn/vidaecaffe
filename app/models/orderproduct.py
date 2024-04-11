from sqlalchemy import ForeignKey

from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class OrderProduct(db.Model):
    __tablename__ = 'order_products'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('orders.id')), nullable=False)
    product_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    size = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'product_id': self.product_id,
            'size': self.size,
            'quantity': self.quantity,
            'price': self.price
        }
