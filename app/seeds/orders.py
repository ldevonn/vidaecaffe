import datetime
from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text


def seed_orders():
    order1 = Order(
        user_id=1,
        order_date=datetime.date.today(),
        subtotal=3.99,
        total=4.15,
        order_status=1
    )

    db.session.add(order1)
    db.session.commit()


def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders"))

    db.session.commit()
