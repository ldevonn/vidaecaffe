from .db import db, environment, SCHEMA, add_prefix_for_prod

table_name = 'recipe_ingredients'

RecipeIngredients = db.Table(
    table_name,
    db.Model.metadata,
    db.Column('recipe_id', db.Integer, db.ForeignKey(add_prefix_for_prod('recipes.id'))),
    db.Column('ingredient_id', db.Integer, db.ForeignKey(add_prefix_for_prod('ingredients.id')))
)

if environment == "production":
    RecipeIngredients.schema = SCHEMA