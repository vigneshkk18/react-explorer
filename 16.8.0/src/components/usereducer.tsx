import { useReducer, ChangeEventHandler } from "react";

const initialState = {
  firstname: "",
  lastname: "",
  fullname: "",
  email: "",
  password: "",
};

type updateKey = keyof Omit<typeof initialState, "username">;

const reducer = (
  state: typeof initialState,
  action: {
    key: updateKey;
    value: string;
  }
) => {
  const updatedState = { ...state, [action.key]: action.value };
  if (["firstname", "lastname"].includes(action.key)) {
    updatedState.fullname = `${updatedState.firstname} ${updatedState.lastname}`;
  }
  return updatedState;
};

const UseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const dispatchHandler: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    dispatch({ key: target.name as updateKey, value: target.value });
  console.log("UseReducer: usereducer re-rendered");

  // similar to useState, with useReducer we can group states that work together / depend on each other
  return (
    <section id="useReducer">
      <form>
        <div>
          <label>
            FirstName:
            <input
              value={state.firstname}
              onChange={dispatchHandler}
              name="firstname"
            />
          </label>
        </div>
        <div>
          <label>
            LastName:
            <input
              value={state.lastname}
              onChange={dispatchHandler}
              name="lastname"
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              value={state.email}
              onChange={dispatchHandler}
              name="email"
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              value={state.password}
              onChange={dispatchHandler}
              type="password"
              name="password"
            />
          </label>
        </div>
      </form>
      <span>{JSON.stringify(state)}</span>
    </section>
  );
};

export default UseReducer;
