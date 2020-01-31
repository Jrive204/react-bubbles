export const DATA_START = "DATA_START";
export const DATA_SUCCESS = "DATA_SUCCESS";
export const DATA_FAILURE = "DATA_FAILURE";
export const EDITING_STATE = "EDITING_STATE";
export const EDITING_STATE_FALSE = "EDITING_STATE_FALSE";

const uuidv4 = require("uuid/v4");

const initialState = {
  isloading: false,
  editing: false,
  colorList: [] ?? [],
  data: {
    color: "",
    code: {
      hex: ""
    },
    id: uuidv4()
  },
  error: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DATA_START:
      return {
        ...state,
        isloading: true
      };
    case DATA_SUCCESS:
      return {
        ...state,
        colorList: action.payload,
        isloading: false
      };
    case DATA_FAILURE:
      return {
        ...state,
        isloading: false,
        colorList: action.payload
      };

    case EDITING_STATE:
      return {
        ...state,
        editing: true
      };
    case EDITING_STATE_FALSE:
      return {
        ...state,
        editing: false
      };

    default:
      return state;
  }
};
