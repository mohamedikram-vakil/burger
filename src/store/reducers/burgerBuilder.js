import * as actionTypes from '../actions/actionTypes';
import updatedObject from "../utility"
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building:false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            // const updateIngredient={[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            // const updateIngredients=updatedObject(state.ingredients,updateIngredient);
            // const updatedState={
            //         ingredients:updateIngredients,
            //         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            // }
            // return updatedObject(state,updatedState)
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building:true
            };
        case actionTypes.REMOVE_INGREDIENT:
            const updateIng={[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updateIngs=updatedObject(state.ingredients,updateIng);
            const updatedStates={
                    ingredients:updateIngs,
                    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                    building:true
            }
            return updatedObject(state,updatedStates)
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false,
                totalPrice: 4,
                building:false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;