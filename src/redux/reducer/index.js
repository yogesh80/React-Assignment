import {LOGIN,ATC} from "../constant/actiontypes";

const initialState= {
    login : false,cart:localStorage.cartdata ? JSON.parse(localStorage.cartdata) : []
}

const rootReducer = (state = initialState, action) => {
    if (action.type === LOGIN) {
        return {...state, login : action.payload };
    }
    if (action.type === ATC) {
        return { ...state,cart : action.payload };
    }
    return state;
}
const atcReducer = (state = [], action) => {
    if (action.type === ATC) {
        return Object.assign({}, state, { cart : action.payload });
    }
    return state;
}
export { rootReducer,atcReducer}