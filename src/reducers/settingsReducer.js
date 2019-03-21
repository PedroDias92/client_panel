import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from "../actions/types";

const initialState = {
  disableBalanceOnAdd: true,
  disableBalanceOnEdit: false,
  allowRegistration: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        disableBalanceOnAdd: !state.disableBalanceOnAdd
      };
    case DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        disableBalanceOnEdit: !state.disableBalanceOnEdit
      };
    case ALLOW_REGISTRATION:
      return {
        ...state,
        allow_registration: !state.allow_registration
      };
    default:
      return state;
  }
}
