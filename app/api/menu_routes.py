from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms import ProductForm
from app.models import Product, db

product_routes = Blueprint('products', __name__)


@product_routes.route('/', methods=['GET'])
def get_all_products():
    """
    Get all the menu items
    """
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products])


@product_routes.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """
    Returns details on a menu item specified by its id
    """
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    else:
        return jsonify(product.to_dict())


@product_routes.route('/<string:category>', methods=['GET'])
def get_products_by_category(category):
    """
      Get all products from a specific category
      """
    products = Product.query.filter_by(category=category).all()
    return jsonify({'products': [product.to_dict() for product in products]})


@product_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product_by_id(product_id):
    """
    Deletes a product specified by its id
    """
    product = Product.query.get(product_id)

    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 401

    if not product:
        return jsonify({'error': 'Product not found'}), 404
    else:
        db.session.delete(product)
        db.session.commit()
        return jsonify({'message': 'Product deleted successfully'})


@product_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def edit_product_by_id(product_id):
    """
    Edits a product specified by its id
    """
    product = Product.query.get(product_id)

    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 401

    if not product:
        return jsonify({'error': 'Product not found'}), 404
    else:
        data = request.get_json()
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.price = data.get('price', product.price)
        product.category = data.get('category', product.category)
        product.product_img = data.get('product_img', product.product_img)
        db.session.commit()
        return jsonify(product.to_dict())


@product_routes.route('/new', methods=['GET', 'POST'])
def create_product():
    """
    Creates a new product
    """
    form = ProductForm()

    if current_user.role != 'admin':
        return jsonify({'error': 'Unauthorized'}), 401

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product = Product(
            name=form.data['name'],
            description=form.data['description'],
            price=form.data['price'],
            category=form.data['category'],
            product_img=form.data['product_img']
        )
        db.session.add(product)
        db.session.commit()
        return product.to_dict()
    return jsonify(form.errors), 400
