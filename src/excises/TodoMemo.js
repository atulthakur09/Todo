import { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      return [...state, action.payload];
    }
    case "REMOVE": {
      return state.filter((ele) => {
        return ele.id != action.payload;
      });
    }
    case "CHANGE": {
      return state.map((ele) => {
        if (ele.id == action.payload) {
          return { ...ele, isCompleted: !ele.isCompleted };
        } else {
          return ele;
        }
      });
    }
  }
}

export default function TodoReducer() {
  // const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  const handleRemove = (id) => {
    const uConfirm = confirm("Are you sure?");
    if (uConfirm) {
      dispatch({ type: "REMOVE", payload: ele.id });
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
      <h2>TodoApp Memo </h2>
      <h2>Listing Your Todo Task's - {todos.length} </h2>

      {/* <h2>Add Your Todo's Here </h2> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Enter title"
        />
        <input type="submit" />
      </form>
      <ul>
        {todos.map((ele) => {
          return (
            <li key={ele.id}>
              <input
                type="checkbox"
                checked={ele.isCompleted}
                onChange={(e) => {
                  dispatch({ type: "CHANGE", payload: ele.id });
                }}
              />
              {ele.title}
              <button
                onClick={() => {
                  handleRemove(ele.id);
                }}
              >
                Remove
              </button>{" "}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
