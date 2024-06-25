import datetime
from app.models import db, Ingredient, environment, SCHEMA
from sqlalchemy.sql import text


def seed_ingredients():
    whole_milk = Ingredient(
        type='milk',
        name='Whole Milk',
        quantity='18',
        unit='ounces'
    )
    espresso = Ingredient(
        type='espresso',
        name='Espresso',
        quantity='2',
        unit='shots'
    )

    db.session.add(whole_milk)
    db.session.add(espresso)
    db.session.commit()


def undo_ingredients():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM inggredients"))

    db.session.commit()
