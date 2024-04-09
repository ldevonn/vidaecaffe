from app.models import db, Menu, environment, SCHEMA
from sqlalchemy.sql import text


def seed_menus():
    cappuccino = Menu(
        name='Cappuccino',
        description='Cappuccino',
        price=10,
        category='cappuccino',
        productImg='link',
        recipeId=1
    )

    db.session.add(cappuccino)
    db.session.commit()


def undo_menus():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.menus RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM menus"))

    db.session.commit()
