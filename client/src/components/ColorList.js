import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  EDITING_STATE,
  EDITING_STATE_FALSE,
  ISLOADING_STATE,
  ISLOADING_STATE_FALSE
} from "../reducers/reducer";
import { Edit, Destroy, Fetch, Send } from "../actions/ApiCalls";
import Loader from "react-loader-spinner";
import { axiosWithAuth } from "../utils/axioswithauth";
const uuidv4 = require("uuid/v4");

const initialColor = {
  color: "",
  code: { hex: "" },
  id: uuidv4()
};

const ColorList = ({}) => {
  console.log(colors, "Colors");

  const dispatch = useDispatch();
  const colors = useSelector(state => state.colorList);
  const editing = useSelector(state => state.editing);
  const isloading = useSelector(state => state.isloading);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState({
    color: "",
    code: { hex: "" },
    id: uuidv4()
  });

  // const [colorlist, setColorList] = useState(colors);

  useEffect(() => {
    dispatch(Fetch());
  }, []);

  const editColor = color => {
    dispatch({ type: EDITING_STATE });
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();

    dispatch(Edit(colorToEdit, colorToEdit.id));
    dispatch({ type: EDITING_STATE_FALSE });
  };

  const deleteColor = color => {
    dispatch(Destroy(color));
    dispatch({ type: EDITING_STATE_FALSE });
  };

  const addColor = e => {
    e.preventDefault();

    dispatch(Send(colorToAdd));
    dispatch({ type: EDITING_STATE_FALSE });
  };

  return (
    <div className='colors-wrap'>
      <h4>colors</h4>
      <ul>
        {colors &&
          !isloading &&
          colors.map(color => (
            <li key={color.color} onClick={() => editColor(color)}>
              <span>
                {console.log(editing, "editing")}
                <span
                  className='delete'
                  onClick={e => {
                    e.stopPropagation();
                    deleteColor(color.id);
                  }}>
                  x
                </span>
                {color.color}
              </span>
              <div
                className='color-box'
                style={{ backgroundColor: color.code.hex }}
              />
            </li>
          ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
            {console.log(colorToEdit, "COLORTOEDITFORM")}
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => dispatch({ type: EDITING_STATE_FALSE })}>
              cancel
            </button>
          </div>
        </form>
      )}
      <div className='spacer' />
      <form style={{ position: "absolute", top: "550px" }} onSubmit={addColor}>
        <legend>Add color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
          {console.log(colorToAdd, "COLORTOEDITFORM")}
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className='button-row'>
          <button type='submit'>save</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
