import {addItemToCart, getUserCart, deleteItemFromCart, updateQuantity} from "../../redux/cart.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {NavLink, redirect, useNavigate} from "react-router-dom";

import './Cart.css'

function Cart() {
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    let itemQuantity = 1

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
        if (currentUser){
            dispatch(getUserCart(currentUser.id));
        } else {
            navigate('/')
        }
        }, [dispatch, currentUser, navigate]);

    useEffect(() => {
        cart && setTotals(handleCalculation(cart))
    }, [cart]);

    if (cart.length === 0) {
        return <>
            <div id='cart-none'>
                <h2>You have no items in your cart :( </h2>
                <NavLink style={{color: 'white'}} to={'/menu'}>Check out our menu first!</NavLink>
            </div>
        </>
    }

    const handleDelete = (item) => {
        let productId = item.product_id
        let quantity = item.quantity - 1

        if (quantity > 0) {
            dispatch(updateQuantity(productId, quantity))
        } else {
            dispatch(deleteItemFromCart(item.id));
        }
        setTotals(handleCalculation(cart))

        setTimeout(() => {
            dispatch(getUserCart(currentUser.id))
        }, 100)
    }

    const handleAdd = (item) => {
        let productId = item.product_id
        let quantity = item.quantity + 1
        dispatch(updateQuantity(productId, quantity));
        setTotals(handleCalculation(cart))

        setTimeout(() => {
            dispatch(getUserCart(currentUser.id))
        }, 100)
    }

    const handleCheckout = async () => {
        await Promise.all(cart.map(item =>
            dispatch(deleteItemFromCart(item.id)))
        )
        dispatch(getUserCart(currentUser.id));
        window.alert('Your order has been placed.')
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