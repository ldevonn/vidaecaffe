import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllProducts } from '../../redux/menu.js';  // Assuming you have a Redux action to get a single product
import Loader from '../Loader';

function DrinkDetails() {
    const dispatch = useDispatch();
    const { drinkId } = useParams();
    const products = useSelector(state => state.menu.products);  // Assuming the product details are stored in state.menu.product

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    if (!products) {
        return <Loader/>
    }
    const product = products.filter(product => product.id == drinkId)[0];

    return (
        <div className="product-details">
            <h1>{product.name}</h1>
            <p>${product.price}</p>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.description}</p>
        </div>
    );
}

export default DrinkDetails;