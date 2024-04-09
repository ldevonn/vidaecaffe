from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime


class Recipe(db.Model):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    size = db.Column(db.String(15), nullable=False)
    ingredients = db.relationship(
        "Ingredient",
        secondary='recipe_ingredients',
        back_populates="recipes",
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'size': self.size,
            'recipeIngredients': self.recipeIngredients
        }