import datetime
from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    latte = Product(
        name='Latte',
        description='A smooth espresso drink made with steamed whole milk and topped with foam',
        price=5.99,
        category='hot-coffee',
        product_img='latte.png',
    )
    americano = Product(
        name='Americano',
        description='Description 2',
        price=5.99,
        category='hot-coffee',
        product_img='latte.png',
    )
    mocha = Product(
        name='Mocha',
        description='Description 3',
        price=5.99,
        category='hot-coffee',
        product_img='latte.png',
    )
    cappuccino = Product(
        name='Cappuccino',
        description='Description 4',
        price=5.99,
        category='hot-coffee',
        product_img='latte.png',
    )

    db.session.add(latte)
    db.session.add(americano)
    db.session.add(mocha)
    db.session.add(cappuccino)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
