from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from app.models import Product


def name_exists(form, field):
    name = field.data
    found = Product.query.filter(Product.name == name).first()
    if found:
        raise ValidationError('A product already exists with that name.')


class ProductForm(FlaskForm):
    name = StringField(
        'name', validators=[DataRequired(), name_exists])
    description = StringField('description', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired(), NumberRange(min=0.0)])
    category = StringField('category', validators=[DataRequired()])
    product_img = StringField('product_img', validators=[DataRequired()])

