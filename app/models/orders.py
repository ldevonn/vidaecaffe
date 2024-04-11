from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey, Column
from sqlalchemy.orm import relationship
from datetime import datetime

class Order(db.Model):
    __tablename__ = 'orders'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    user = relationship('User', back_populates='orders')
    order_items = relationship('OrderItem', back_populates='order', cascade='all, delete')

    id = db.Column(db.Integer, primary_key=True)
    user_id = Column(db.Integer, ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    order_date = Column(db.DateTime, default=datetime.utcnow)
    subtotal = db.Column(db.Float, nullable=False)
    total = db.Column(db.Float, nullable=False)
    order_status = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'orderDate': self.order_date,
            'subtotal': self.subtotal,
            'total': self.total,
            'orderStatus': self.order_status,
        }