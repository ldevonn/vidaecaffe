from app.models import db, Ingredient, environment, SCHEMA
from sqlalchemy.sql import text


def seed_ingredients():
    milk = Ingredient(
        name='Milk',
        quantity=24,
        unit='Ounces'
    )

    db.session.add(milk)
    db.session.commit()


def undo_ingredients():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.ingredients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM ingredients"))

    db.session.commit()
