import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts } from '../../redux/menu.js';
import Loader from '../Loader';
import Cart from '../Cart/Cart';

import './DrinkDetails.css'

function DrinkDetails() {
    const dispatch = useDispatch();
    const { drinkId } = useParams();
    const products = useSelector(state => state.menu.products);
    const currentUser = useSelector(state => state.session.user);
    const {addItem, getItems } = Cart()

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    if (!products) {
        return <Loader/>
    }
    const product = products.filter(product => product.id == drinkId)[0];

    return (
        <>
            <div className="product-details">
                <h1>{product.name}</h1>
                <p>${product.price}</p>
                <img src={product.imageUrl} alt={product.name} />
                <p>{product.description}</p>
            </div>
            {currentUser && currentUser.role === 'admin' ? (
                <>
                    <button className='cart-edit-button' onClick={() => addItem(product)}>Edit Item</button>
                    <button className='cart-delete-button' onClick={() => addItem(product)}>Delete Item</button>
                </>

            ) :
                ''
            }
                <button className='cart-add-button' onClick={() => addItem(product)}>Add to Cart</button>
        </>
    );
}

export default DrinkDetails;