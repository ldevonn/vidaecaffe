from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class RecipeIngredient(db.Model):
    __tablename__ = 'recipe_ingredients'

    id = db.Column(db.Integer, primary_key=True)
    recipeId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('recipes.id')))
    ingredient_id = db.Column(db.Integer, ForeignKey(add_prefix_for_prod('ingredients.id')))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'recipeId': self.recipeId,
            'ingredient_id': self.ingredient_id,
        }