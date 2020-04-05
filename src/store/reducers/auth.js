import * as actionTypes from "../actions/actionTypes";
import updatedObject from "../utility";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  redirectPath: "/",
};
const authStart = (state, actions) => {
  return updatedObject(state, { error: null, loading: true });
};
const authSuccess = (state, actions) => {
  return updatedObject(state, {
    token: actions.idToken,
    userId: actions.id,
    loading: false,
  });
};
const authFail = (state, actions) => {
  return updatedObject(state, { error: actions.error, loading: false });
};
const authLogout = (state, actions) => {
  return updatedObject(state, { token: null, userId: null });
};
const authRedirect = (state, actions) => {
  return updatedObject(state, { redirectPath: actions.path });
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.AUTH_START:
      return authStart(state, actions);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, actions);
    case actionTypes.AUTH_FAIL:
      return authFail(state, actions);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, actions);
    case actionTypes.AUTH_REDIRECT:
      return authRedirect(state, actions);
    default:
      return state;
  }
};

export default reducer;
