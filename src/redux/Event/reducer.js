import * as types from "./types";

export const initialState = {
  eventList: [],
};

const EventReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD_EVENT:
      return {
        ...state,
        eventList: [...state.eventList, payload],
      };
    case types.UPDATE_EVENT:
      return {
        ...state,
        eventList: state.eventList.map((val) =>
          val.id === payload.id ? payload : val
        ),
      };
    case types.REMOVE_EVENT:
      return {
        ...state,
        eventList: state.eventList.filter((v) => v.id !== payload.id),
      };
    default:
      return state;
  }
};

export default EventReducer;
