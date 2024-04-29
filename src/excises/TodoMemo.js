import { useReducer, useState } from "react";
import "./styles.css";

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      return [...state, action.payload];
    }
    case "REMOVE": {
      return state.filter((ele) => {
        return ele.id !== action.payload;
      });
    }
    case "CHANGE": {
      return state.map((ele) => {
        if (ele.id === action.payload) {
          return { ...ele, isCompleted: !ele.isCompleted };
        } else {
          return ele;
        }
      });
    }
    default: {
      return state;
    }
  }
}

export default function TodoReducer() {
  const [title, setTitle] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  const handleRemove = (id) => {
    const userConfirm = window.confirm("Are you sure?");
    if (userConfirm) {
      dispatch({ type: "REMOVE", payload: id });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todo = {
      id: Number(new Date()),
      title: title,
      isCompleted: false,
    };

    dispatch({ type: "ADD", payload: todo });
    setTitle("");
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <h2>TodoApp Memo</h2>
      <h2>Listing Your Todo Task's - {todos.length}</h2>

      {todos.length === 0 ? <p>Add Your Todo's Here</p> : <p>List Of Todos</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="Enter title"
        />
        <input type="submit" />
      </form>
      <ul>
        {todos.map((ele) => (
          <li
            key={ele.id}
            style={{ textDecoration: ele.isCompleted ? "line-through" : "" }}
          >
            <input
              type="checkbox"
              checked={ele.isCompleted}
              onChange={() => {
                dispatch({ type: "CHANGE", payload: ele.id });
              }}
            />
            {ele.title}
            <button onClick={() => handleRemove(ele.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
