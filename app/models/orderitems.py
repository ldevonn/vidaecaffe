from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from . import Order

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    order = relationship('Order', back_populates='order_items')

    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, ForeignKey(Order.id))
    productId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('menus.id')))
    quantity = db.Column(db.Integer)
    subtotal = db.Column(db.Float)

    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.orderId,
            'productId': self.productId,
            'quantity': self.quantity,
            'subtotal': self.subtotal,
        }