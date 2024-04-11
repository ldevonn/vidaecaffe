from sqlalchemy import ForeignKey
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class ProductIngredient(db.Model):
    __tablename__ = 'product_ingredients'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('products.id')))
    ingredient_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('ingredients.id')))

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'ingredient_id': self.ingredient_id
        }
