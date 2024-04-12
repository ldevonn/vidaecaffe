from flask import Blueprint, jsonify
from flask_login import login_required, current_user

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
