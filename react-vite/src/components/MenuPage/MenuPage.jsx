import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllProducts} from "../../redux/menu.js";


function MenuPage() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.menu.products);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts())
    }
    fetchData()
  }, [dispatch]);

  return (
      <>
        {products && products.map((product) => (
            <div>
              <h2 key={product.id}>{product.name}</h2>
              <p>{product.price}</p>
              <p>{product.description}</p>

            </div>
        ))}
      </>
  );
}

export default MenuPage;
