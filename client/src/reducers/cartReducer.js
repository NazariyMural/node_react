import { TO_CART } from "../actions/types";
export default (state = [], action) => {
    switch (action.type) {
        case TO_CART:
            let newState = []
            newState.push(action.payload)
            return newState
        default:
            return state;
    }
};
