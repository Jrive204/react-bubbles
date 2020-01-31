import { DATA_START, DATA_FAILURE, DATA_SUCCESS } from "../reducers/reducer";
import { axiosWithAuth } from "../utils/axioswithauth";

export const Fetch = () => dispatch => {
  dispatch({ type: DATA_START });

  axiosWithAuth()
    .get("/api/colors")
    .then(
      res =>
        console.log(res, "res data") &
        dispatch({ type: DATA_SUCCESS, payload: res.data })
    )
    .catch(
      err =>
        console.log(err, "ERROR") &
        dispatch({ type: DATA_FAILURE, payload: err })
    );
};

export const Send = data => dispatch => {
  dispatch({ type: DATA_START });
  axiosWithAuth()
    .post(`/api/colors/`, data)
    .then(res => {
      console.log(res, "data ");
      setTimeout(() => {
        dispatch({ type: DATA_SUCCESS, payload: res.data });
      }, 2500);
    })
    .catch(err => {
      dispatch({ type: DATA_FAILURE, payload: err.response });
    });
};

export const Edit = (data, id) => dispatch => {
  dispatch({ type: DATA_START });
  axiosWithAuth()
    .put(`/api/colors/${id}`, data)
    .then(res => {
      console.log(res, "data ");
      setTimeout(() => {
        dispatch({ type: DATA_SUCCESS, payload: res.data });
      }, 2500);
    })
    .catch(err => {
      dispatch({ type: DATA_FAILURE, payload: err.response });
    });
};

export const Destroy = id => dispatch => {
  dispatch({ type: DATA_START });
  axiosWithAuth()
    .delete(`/api/colors/${id}`)
    .then(res => {
      console.log(res, "data ");
      setTimeout(() => {
        dispatch({ type: DATA_SUCCESS, payload: res.data });
      }, 2500);
    })
    .catch(err => {
      dispatch({ type: DATA_FAILURE, payload: err.response });
    });
};
