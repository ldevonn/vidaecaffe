from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app import db
from app.models import Order

order_routes = Blueprint('orders', __name__)


@order_routes.route('/', methods=['GET'])
@login_required
def get_all_user_orders():
    """
    Get all the current users orders
    """

    user_id = current_user.id

    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify({'orders': [order.to_dict() for order in orders]})


@order_routes.route('/<int:order_id>', methods=['GET'])
@login_required
def get_order(order_id):
    """
    Get a specific order by id
    """
    order = Order.query.get(order_id)
    if current_user.id != order.user_id and current_user.role != 'admin':
        return jsonify({'message': 'Unauthorized'})
    if not order:
        return jsonify({'message': 'Order not found'})
    else:
        return jsonify({'order': order.to_dict()})


@order_routes.route('/', methods=['POST'])
@login_required
def create_order():
    """
    Creates a new order
    """
    data = request.get_json()

    new_order = Order(user_id=current_user.id,
                      order_date=datetime.now(),
                      subtotal=data.get('subtotal'),
                      total=data.get('total'),
                      order_status=data.get('order_status')
                      )

    db.session.add(new_order)
    db.session.commit()

    return jsonify({'order': new_order.to_dict(), 'message': 'Order created successfully'}), 201


@order_routes.route('/<int:order_id>', methods=['DELETE'])
@login_required
def delete_order(order_id):
    """
    Delete an order by id
    """
    order = Order.query.get(order_id)

    if current_user.id != order.user_id or current_user.role != 'admin':
        return jsonify({'message': 'Unauthorized'})

    if not order:
        return jsonify({'message': 'Order not found'})

    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': 'Order deleted successfully'})
