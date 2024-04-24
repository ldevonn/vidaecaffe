const GET_PRODUCTS = 'session/getProducts';
const DELETE_PRODUCT = 'session/deleteProduct';
const CREATE_PRODUCT = 'session/createProduct';
const EDIT_PRODUCT = 'session/editProduct';
const getProducts = (products) => ({
  type: GET_PRODUCTS,
  payload: products
});

const deleteProduct = (product) => ({
    type: DELETE_PRODUCT,
    payload: product
})

const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    payload: product
})

const editProduct = (product) => ({
    type: EDIT_PRODUCT,
    payload: product
})

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

export const deleteProductById = (id) => async dispatch => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE'
    });
    if (response.ok) {
      dispatch(deleteProduct(id));
    }
}

export const createNewProduct = (product) => async dispatch => {
    const response = await fetch('/api/products/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(createProduct(data));
        return data
    } else if (response.status < 500) {
        const errors = await response.json();
        return errors
      }
}

export const editExistingProduct = (product) => async dispatch => {
    const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editProduct(data));
        return data;
    } else if (response.status < 500) {
        const errors = await response.json();
        return errors;
    }
}




const initialState = { products: null };

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, products: action.payload };
    case DELETE_PRODUCT:
      return { ...state, products: action.payload.filter(
          product => product.id !== action.payload.id
          ) };
    case CREATE_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    case EDIT_PRODUCT:
        return { ...state, products: [...state.products, action.payload] };
    default:
      return state;
  }
}

export default menuReducer;