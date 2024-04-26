import {redirect, useNavigate, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {deleteProductById, getAllProducts} from '../../redux/menu.js';
import Loader from '../Loader';
import {addItemToCart} from "../../redux/cart.js";

import './DrinkDetails.css'

function DrinkDetails() {
    const dispatch = useDispatch();
    const { drinkId } = useParams();
    const products = useSelector(state => state.menu.products);
    const currentUser = useSelector(state => state.session.user);
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    const handleDelete = () => {
        dispatch(deleteProductById(drinkId));
        navigate('/menu')
    }
    if (!products) {
        return <Loader/>
    }
    const addItem = () => {
        const reqData = {
            product_id: product.id,
            quantity: 1
        }
        const res = dispatch(addItemToCart(reqData));
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
                    <button className='cart-edit-button' onClick={() => navigate(`/drinks/${product.id}/edit`)}>Edit Item</button>
                    <button className='cart-delete-button' onClick={() => handleDelete()}>Delete Item</button>
                </>

            ) :
                ''
            }
                <button className='cart-add-button' onClick={() => addItem()}>Add to Cart</button>
        </>
    );
}

export default DrinkDetails;