import {useState, useEffect} from 'react'

function Cart() {
    const getInitialCart = () => JSON.parse
    (window.localStorage.getItem('cart')) || [];

    const [cart, setCart] = useState(getInitialCart);

    useEffect(() => {
        window.localStorage.setItem('cart',
            JSON.stringify(cart));
    }, [cart]);

    const addItem = item => {
        setCart(currentCart => [...currentCart, item])
    };

    const getItems = () => {
        return cart
    };

    return {addItem, getItems}
}

export default Cart