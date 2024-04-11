import datetime
from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    latte = Product(
        name='Latte',
        description='A smooth espresso drink made with steamed whole milk and topped with foam',
        price=5.99,
        category=1,
        product_img='latte.png',
    )

    db.session.add(latte)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
