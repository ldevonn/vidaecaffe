const GET_CART = 'GET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_ITEM = 'DELETE_ITEM';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'

const getCart = (cart) => ({
  type: GET_CART,
  payload: cart.items
});
const addToCart = (product) => ({
    type: ADD_TO_CART,
    payload: product
})

const deleteItem = (product) => ({
    type: DELETE_ITEM,
    payload: product
})

const updateItemQuantity = (product) => ({
    type: UPDATE_ITEM_QUANTITY,
    payload: product
})

export const getUserCart = (userId) => async dispatch => {
    const response = await fetch(`/api/carts/${userId}`)

    if (response.ok) {
        const cart = await response.json();
        dispatch(getCart(cart));
        return cart
    }
}

export const updateQuantity = (productId, quantity) => async(dispatch) => {
    const response = await fetch(`/api/carts/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity })
    });

    if (response.ok) {
        const updatedCart = await response.json();
        dispatch(updateItemQuantity(updatedCart.item));
        return updatedCart;
    }
}

export const addItemToCart = (product) => async dispatch => {
    const response = await fetch('/api/carts/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    if (response.ok) {
        const updatedCart = await response.json();
        dispatch(addToCart(updatedCart.item));
        return updatedCart;
    }
}
export const deleteItemFromCart = (item_id) => async dispatch => {
    const response = await fetch('/api/carts/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({item_id})
    });

    if (response.ok) {
        dispatch(deleteItem(item_id));
        return response;
    }
}

const initialState = {
  cart: [],
};


function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_TO_CART:
        return {
            ...state,
            cart: [...state.cart, action.payload],
        }
      case DELETE_ITEM:
          return {
              ...state,
              cart: state.cart.filter(item => item.id !== action.payload)
          }
    case UPDATE_ITEM_QUANTITY:
        return {
            ...state,
            cart: state.cart.map(item =>
                item.product_id === action.payload.productId
                    ? {...item, quantity: action.payload.quantity}
                    : item
           )
     };
    default:
      return state;
  }
}

export default cartReducer;