import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import authActions from "./authActions";

const initialUserState = {
  email: null,
  firstname: null,
  role: null,
  age: null,
  gender: null,
  city: null,
  country: null,
  avatar: null,
  rating: null,
};

const user = createReducer(initialUserState, {
  [authActions.registerSuccess]: (_, { payload }) => ({
    email: payload.user.email,
    firstname: payload.user.firstname,
    role: payload.user.role,
    age: payload.user.age,
    gender: payload.user.gender,
    city: payload.user.city,
    country: payload.user.country,
    id: payload.user._id,
    joinedRoom: payload.user.joinedRoom,
    avatar: null,
  }),
  [authActions.loginSuccess]: (_, { payload }) => ({
    email: payload.user.email,
    firstname: payload.user.firstname,
    role: payload.user.role,
    age: payload.user.age,
    gender: payload.user.gender,
    city: payload.user.city,
    country: payload.user.country,
    avatar: payload.user.avatar,
    id: payload.user._id,
    rating: payload.user.rating,
    height: payload.user.height,
    weight: payload.user.weight,
  }),
  [authActions.getCurrentUserSuccess]: (_, { payload }) => ({
    email: payload.user.email,
    firstname: payload.user.firstname,
    role: payload.user.role,
    age: payload.user.age,
    gender: payload.user.gender,
    city: payload.user.city,
    country: payload.user.country,
    avatar: payload.user.avatar,
    joinedRoom: payload.user.joinedRoom,
    id: payload.user._id,
    rating: payload.user.rating,
    height: payload.user.height,
    weight: payload.user.weight,
  }),
  [authActions.logOutSuccess]: () => initialUserState,
});

const token = createReducer(null, {
  [authActions.registerSuccess]: (_, { payload }) => payload.token,
  [authActions.loginSuccess]: (_, { payload }) => payload.token,
  [authActions.logOutSuccess]: () => null,
});

const error = createReducer(null, {
  [authActions.registerError]: (_, { payload }) => payload,
  [authActions.loginError]: (_, { payload }) => payload,
  [authActions.getCurrentUserError]: (_, { payload }) => payload,
  [authActions.logOutError]: (_, { payload }) => payload,
});

export default combineReducers({
  user,
  token,
  error,
});
