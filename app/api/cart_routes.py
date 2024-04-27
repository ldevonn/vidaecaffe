from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app import db
from app.models import Cart, CartItem

cart_routes = Blueprint('carts', __name__)


@cart_routes.route('/<user_id>', methods=['GET'])
def get_current_users_cart(user_id):
    cart = Cart.query.filter_by(user_id=user_id).first()
    if cart:
        return jsonify(cart.to_dict())
    else:
        return jsonify({'message': 'Cart not found'}), 404


@cart_routes.route('/add', methods=['POST'])
@login_required
def add_to_cart():
    if not current_user:
        return jsonify({'message': 'Not logged in'}), 401

    cart = Cart.query.filter_by(user_id=current_user.id).first()

    if cart is None:
        cart = Cart(user_id=current_user.id)
        db.session.add(cart)
        db.session.commit()

    product_id = request.json['product_id']
    quantity = request.json['quantity']

    if product_id is None or quantity is None:
        return jsonify({'message': 'Product or quantity missing'}), 400

    item = CartItem(cart_id=cart.id, product_id=product_id, quantity=quantity)

    db.session.add(item)
    db.session.commit()

    return jsonify(success=True, item=item.to_dict()), 201

@cart_routes.route('/delete', methods=['DELETE'])
@login_required
def remove_from_cart():
    if not current_user:
        return jsonify({'message': 'Not logged in'}), 401

    cart = Cart.query.filter_by(user_id=current_user.id).first()

    if cart is None:
        return jsonify({'message': 'Cart not found'}), 404

    item_id = request.json['item_id']
    item = CartItem.query.filter_by(id=item_id, cart_id=cart.id).first()

    if item is None:
        return jsonify({'message': 'Item not found in cart'}), 404

    db.session.delete(item)
    db.session.commit()
    updatedItems = CartItem.query.filter_by(cart_id=cart.id).first()
    if updatedItems is None:
        db.session.delete(cart)
        db.session.commit()
        return jsonify(success=True, message='Item and cart removed'), 200

    return jsonify(success=True, message='Item removed from cart'), 200