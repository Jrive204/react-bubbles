import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { EDITING_STATE, EDITING_STATE_FALSE } from "../reducers/reducer";
import { Edit, Destroy } from "../actions/ApiCalls";
import Loader from "react-loader-spinner";
const uuidv4 = require("uuid/v4");

const initialColor = {
  color: "",
  code: { hex: "" },
  id: uuidv4()
};

const ColorList = ({ colors, dispatch }) => {
  console.log(colors, "Colors");

  const editing = useSelector(state => state.editing);
  const isloading = useSelector(state => state.isloading);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // const [colorlist, setColorList] = useState(colors);

  const editColor = color => {
    dispatch({ type: EDITING_STATE });
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    dispatch(Edit(colorToEdit, colorToEdit.id));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    dispatch(Destroy(color));
  };

  useEffect(() => {
    if (!colors) {
      return [];
    }
  }, [colors]);

  return (
    <div className='colors-wrap'>
      <h4>colors</h4>
      <ul>
        {isloading && (
          <Loader
            type='BallTriangle'
            color='#00BFFF'
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        )}
        {colors.map(color => (
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
              </span>{" "}
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
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
