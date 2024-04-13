const GET_PRODUCTS = 'session/getProducts';
const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products
});

export const getAllProducts = () => async dispatch => {
    const response = await fetch('/api/products');
    if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(getProducts(data));
	}
}

const initialState = { products: null };

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
}

export default menuReducer;