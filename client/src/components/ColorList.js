import React, { useState } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);
  const [addMode, setAddMode] = useState(false)

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        axiosWithAuth()
          .get('/api/colors')
          .then(res => {
          updateColors(res.data)
        })
      })
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        updateColors([
          ...colors.filter( ele => ele.id !== res.data)
        ])
      })
      .catch(err => console.log(err))
  };

  const saveAdd = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/api/colors/`, colorToAdd)
      .then(() => {
        axiosWithAuth()
          .get('/api/colors')
          .then(res => {
          updateColors(res.data)
          setAddMode(false)
        })
      })
      .catch(err => console.log(err))
  };

  return (
    <div>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>

    

      {addMode && !editing ?
        <form onSubmit={saveAdd}>
        <legend>Add Color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
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
        <div>
          <button type="submit">save</button>
          <button onClick={() => setAddMode(false)}>cancel</button>
        </div>
      </form>
      : <button onClick={() => setAddMode(true)}>Add Color</button>}

  

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
          <div>
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div/>
      {}
    </div>
  );
};

export default ColorList;