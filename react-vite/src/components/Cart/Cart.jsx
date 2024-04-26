import {addItemToCart, getUserCart, deleteItemFromCart} from "../../redux/cart.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import vidaLogo from "../../assets/vidaLogo.png";

import './Cart.css'

function Cart() {
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    useEffect(() => {
        if (currentUser){
            dispatch(getUserCart(currentUser.id));
        } else {
            navigate('/')
        }
        }, [dispatch]);

    if (cart.length === 0) {
        return <>
            <div id='cart-none'>
                <h2>You have no items in your cart :( </h2>
                <NavLink style={{color: 'white'}} to={'/menu'}>Check out our menu first!</NavLink>
            </div>
        </>
    }

    const handleDelete = (item) => {
        dispatch(deleteItemFromCart(item.id));
    }

    const handleAdd = (item) => {
        const reqData = {
            product_id: item.product_id,
            quantity: 1
        }
        dispatch(addItemToCart(reqData));
    }
    return (
        <>
            <h1>Cart</h1>
            <div className="cart-container">
                {cart.map(item => (
                    <div key={item.id} id="cart-item">
                        <p>{item.product_name}</p>
                        <div>
                            <i className="fa-solid fa-minus" onClick={() => handleDelete(item)}></i>
                            <i className="fa-solid fa-plus" onClick={() => handleAdd(item)}></i>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Cart