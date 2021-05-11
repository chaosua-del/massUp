import axios from "axios";
import authActions from "./authActions";

const url = "http://localhost:5000/api/users";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const register = (credentials) => (dispatch) => {
  dispatch(authActions.registerRequest());
  console.log(credentials);
  axios
    .post(`${url}/register`, credentials)
    .then((response) => {
      console.log(response.data);
      dispatch(authActions.registerSuccess(response.data));
      token.set(response.data.token);
    })
    .catch((error) => {
      dispatch(authActions.registerError(error));
    });
};

const logIn = (credentials) => (dispatch) => {
  dispatch(authActions.loginRequest());
  // console.log(credentials);
  axios
    .post(`${url}/login`, credentials)
    .then((response) => {
      console.log("response-data", response.data);
      dispatch(authActions.loginSuccess(response.data));
      token.set(response.data.token);
    })
    .catch((error) => {
      dispatch(authActions.loginError(error));
    });
};

const logOut = () => (dispatch) => {
  // dispatch(authActions.logoutRequest());
  dispatch(authActions.logOutSuccess());
  token.unset();
};

const getCurrentUser = () => (dispatch, getState) => {
  const persistedToken = getState().auth.token;

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);
  dispatch(authActions.getCurrentUserRequest());

  axios
    .get(`${url}/me`)
    .then((response) => {
      dispatch(authActions.getCurrentUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch(authActions.getCurrentUserError(error));
    });
};

const authOperations = {
  register,
  logIn,
  logOut,
  getCurrentUser,
};

export default authOperations;
