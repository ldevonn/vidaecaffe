from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime


class Ingredient(db.Model):
    __tablename__ = "ingredients"

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    recipes = db.relationship("Recipe", secondary='recipe_ingredients', back_populates="ingredients")

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(30), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'quantity': self.quantity,
            'unit': self.unit,
        }
