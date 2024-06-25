import {addItemToCart, getUserCart, deleteItemFromCart} from "../../redux/cart.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";

import './Cart.css'

function Cart() {
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    const [totals, setTotals] = useState({
        subtotal: 0,
        tax: 0,
        total: 0
    })
    const handleCalculation = (cart) => {
        return {
            subtotal: Number((cart.length * 5.99).toFixed(2)),
            tax: Number((cart.length * 5.99 * 0.15).toFixed(2)),
            total: Number((cart.length * 5.99 + cart.length * 5.99 * 0.15).toFixed(2))
        }
    }

    useEffect(() => {
        cart && setTotals(handleCalculation(cart))

        if (currentUser){
            dispatch(getUserCart(currentUser.id));
        } else {
            navigate('/')
        }
        }, [dispatch, currentUser, cart, navigate]);

    if (cart.length === 0) {
        return <>
            <div id='cart-none'>
                <h2>You have no items in your cart :( </h2>
                <NavLink style={{color: 'white'}} to={'/menu'}>Check out our menu first!</NavLink>
            </div>
        </>
    }

    const handleDelete = (item) => {
        if (item.quantity > 1) {
            //   if item quantity more than 1, decrease the quantity
            const reqData = {
                product_id: item.product_id,
                quantity: 1
            }
            // Assuming the deleteItemFromCart function will decrease the quantity of item
            dispatch(deleteItemFromCart(reqData));
        } else {
            // if quantity is one, delete the item completely
            dispatch(deleteItemFromCart(item.id));
        }
        setTotals(handleCalculation(cart))
    }

    const handleAdd = (item) => {
        const reqData = {
            product_id: item.product_id,
            quantity: 1
        }
        dispatch(addItemToCart(reqData));
        setTotals(handleCalculation(cart))
    }

    const handleCheckout = () => {
        cart.forEach(item => {
            dispatch(deleteItemFromCart(item.id))
        })
        window.alert('Your order has been placed')
    }


    return (
        <>
        <div className="cart-container">
            <h1>Cart</h1>
            {cart.map(item => (
                <div key={item.id} className="cart-item">
                    <p className="item-name">{item.product_name}</p>
                    <p className="item-price">$5.99</p>
                    <div className="item-quantity">
                        <button onClick={() => handleDelete(item)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleAdd(item)}>+</button>
                    </div>
                </div>
            ))}
            <div className='calcuation'>
                <h5>Subtotal: {totals.subtotal}</h5>
                <h5>Tax: {totals.tax}</h5>
                <h5>Total: {totals.total}</h5>
            </div>
            <button className="checkout-button" onClick={() => handleCheckout()}>Checkout</button>
        </div>
    </>
    )
}

export default Cart