from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey, Column
from sqlalchemy.orm import relationship
from datetime import datetime

class Order(db.Model):
    _tablename__ = 'orders'

    order_items = relationship('OrderItem', backref='order', cascade='all, delete')

    id = db.Column(db.Integer, primary_key=True)
    user_id = Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    orderDate = Column(db.DateTime, default=datetime.utcnow)
    subtotal = db.Column(db.Float, nullable=False)
    total = db.Column(db.Float, nullable=False)
    orderStatus = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.userId,
            'orderDate': self.orderDate,
            'subtotal': self.subtotal,
            'total': self.total,
            'orderStatus': self.orderStatus,
        }