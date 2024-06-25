from sqlalchemy import ForeignKey
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Ingredient(db.Model):
    __tablename__ = 'ingredients'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(15), nullable=False)
    name = db.Column(db.String(15), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    unit = db.Column(db.String(15), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'type': self.type,
            'name': self.name,
            'quantity': self.quantity,
            'unit': self.unit
        }
