from flask.cli import AppGroup
from .users import seed_users, undo_users
from .menus import seed_menus, undo_menus
from .ingredients import seed_ingredients, undo_ingredients
from .recipes import seed_recipes, undo_recipes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        undo_menus()
        undo_recipes()
        undo_ingredients()
    seed_users()
    seed_menus()
    seed_recipes()
    seed_ingredients()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_menus()
    undo_recipes()
    undo_ingredients()
