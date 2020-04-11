import { TOGGLE_GENERIC_BUTTON } from "../actions/farematrix";

const initialState = {
  initialLocation: { data: "test" },
  selectedLocation: {},
  userLocation: {},
  fromLocation: {}
};

const locationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_GENERIC_BUTTON: {
      return {
        ...state,
        initialLocation: { data: action.text }
      };
    }
    default:
      return state;
  }
};

export default locationsReducer;
