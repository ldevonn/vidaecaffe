import {useEffect} from "react";
import {getAllProducts} from "../../../redux/menu.js";
import {useDispatch, useSelector} from "react-redux";
import './HotCoffee.css'
import vidaLogo from '../../../assets/vidaLogo.png'
import {useNavigate, useParams} from "react-router-dom";

function HotCoffee() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.menu.products);
    const {category} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts())
    }
    fetchData()
  }, [dispatch]);

    const displayProducts = products ? products.filter(product => product.category === category) : [];

    const handleClick = (id) => {
        navigate(`/drinks/${category}/${id}`);
    }

    return (
        <>
            <div id='display-grid'>
                {
                    displayProducts.map(product => (
                      <div key={product.id} onClick={() => handleClick(product.id)}>
                        <img id='product-img' src={vidaLogo} />
                          <div id='display-card'>
                            <h4>{product.name}</h4>
                            <p>${product.price}</p>
                          </div>
                      </div>
                    ))
                }
            </div>
        </>
    )
}

export default HotCoffee;