from flask.cli import AppGroup
from .users import seed_users, undo_users
from .orders import seed_orders, undo_orders
from .products import seed_products, undo_products
from .ingredients import seed_ingredients, undo_ingredients

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        undo_orders()
        undo_products()
        undo_ingredients()
    seed_users()
    seed_orders()
    seed_products()
    seed_ingredients()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_orders()
    undo_products()
    undo_ingredients()