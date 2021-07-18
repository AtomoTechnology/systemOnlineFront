import { types } from "../types/types";

const initialState = {
  checking: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
      case types.login : 
        return {
            ...state,
            ...action.payload,
            checking : false
        }
        case types.registerClient :
          return {
            ...state,
            ...action.payload
          }
    // case types.startLogin:
    //   return {
    //     ...state,
    //     ...action.payload,
    //     checking: false,
    //   };
    // case types.finishChecking:
    //   return {
    //     ...state,
    //     checking: false,
    //   };
    // case types.logout:
    //   return {
    //     checking: false,
    //   };
    default:
      return state;
  }
};
