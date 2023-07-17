import * as types from "./types";

//List of User
export const addEventAction = (payload) => {
  return {
    type: types.ADD_EVENT,
    payload,
  };
};

export const updateEventAction = (payload) => {
  return {
    type: types.UPDATE_EVENT,
    payload,
  };
};

export const removeEventAction = (payload) => {
  return {
    type: types.REMOVE_EVENT,
    payload,
  };
};