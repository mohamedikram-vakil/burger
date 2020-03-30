import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: ""
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...actions.orderData,
        id: actions.orderId
      };
      return {
        ...state,
        purchased: true,
        loading: false,
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.FETCH_ORDER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: actions.orders
      };
    case actionTypes.FETCH_ORDER_FAIL: {
      return {
        ...state,
        loading:false,
        error:actions.error
      };
    }
    default:
      return state;
  }
};
export default reducer;
