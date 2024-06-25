from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship

class Cart(db.Model):
    __tablename__ = 'carts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = relationship('User', backref='cart', uselist=False)
    items = relationship("CartItem", back_populates="cart")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'items': [item.to_dict() for item in self.items],
        }

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('carts.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    cart = relationship("Cart", back_populates="items")
    product = relationship("Product", backref="cart_items")

    def to_dict(self):
        return {
            'id': self.id,
            'cart_id': self.cart_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'product_name': self.product.name,
            'product_image': self.product.product_img,
        }