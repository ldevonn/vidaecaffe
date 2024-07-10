import datetime
from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    hotLatte = Product(
        name='Hot Latte',
        description='A smooth espresso drink made with steamed whole milk and topped with foam',
        price=5.99,
        category='hot-coffee',
        product_img='latte.png',
    )
    hotAmericano = Product(
        name='Hot Americano',
        description='Description 2',
        price=5.99,
        category='hot-coffee',
        product_img='latte.png',
    )
    hotMocha = Product(
        name='Hot Mocha',
        description='Description 3',
        price=5.99,
        category='hot-coffee',
        product_img='latte.png',
    )
    hotCappuccino = Product(
        name='Hot Cappuccino',
        description='Description 4',
        price=5.99,
        category='hot-coffee',
        product_img='latte.png',
    )
    icedLatte = Product(
        name='Iced Latte',
        description='Description 5',
        price=5.99,
        category='iced-coffee',
        product_img='latte.png'
    )
    icedAmericano = Product(
        name='Iced Americano',
        description='Description 5',
        price=5.99,
        category='iced-coffee',
        product_img='latte.png'
    )
    icedMocha = Product(
        name='Iced Mocha',
        description='Description 5',
        price=5.99,
        category='iced-coffee',
        product_img='latte.png'
    )
    icedCappucino = Product(
        name='Iced Cappucino',
        description='Description 5',
        price=5.99,
        category='iced-coffee',
        product_img='latte.png'
    )
    icedBlackTea = Product(
        name='Iced Black Tea',
        description='Description 5',
        price=5.99,
        category='iced-tea',
        product_img='latte.png'
    )
    hotBlackTea = Product(
        name='Hot Black Tea',
        description='Description 5',
        price=5.99,
        category='hot-tea',
        product_img='latte.png'
    )
    icedGreenTea = Product(
        name='Iced Green Tea',
        description='Description 5',
        price=5.99,
        category='iced-tea',
        product_img='latte.png'
    )
    hotGreenTea = Product(
        name='Hot Green Tea',
        description='Description 5',
        price=5.99,
        category='hot-tea',
        product_img='latte.png'
    )

    db.session.add(hotLatte)
    db.session.add(hotAmericano)
    db.session.add(hotMocha)
    db.session.add(hotCappuccino)
    db.session.add(icedLatte)
    db.session.add(icedMocha)
    db.session.add(icedAmericano)
    db.session.add(icedCappucino)
    db.session.add(hotGreenTea)
    db.session.add(hotBlackTea)
    db.session.add(icedGreenTea)
    db.session.add(icedBlackTea)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
