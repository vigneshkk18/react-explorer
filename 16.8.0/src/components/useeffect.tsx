import { useEffect, useState, ChangeEventHandler } from "react";

interface UserInfo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// useEffects allows us to act on component lifecycle events
// 1. componentDidMount - fires when the component mounts.
// 2. componentWillUnmount - fires when the component removed from the DOM
// 3. componentDidUpdate - fires when the component re-renders.
const UseEffect = () => {
  const [todo, setTodo] = useState<UserInfo>();
  const [todoCompleteStatus, setTodoCompleteStatus] = useState<
    "PENDING" | "COMPLETED"
  >("PENDING");

  const fetchUserInfo = async () => {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const randId = ids[Math.floor(Math.random() * ids.length)];
    fetch(`https://jsonplaceholder.typicode.com/todos/${randId}`)
      .then((response) => response.json())
      .then(setTodo);
  };

  const updateUserInfo: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (!todo) return;
    const name = target.name;
    if (target.type === "checkbox") {
      setTodo({ ...todo, [name]: target.checked });
    } else {
      setTodo({ ...todo, [name]: target.value });
    }
  };

  // lifecycle events - componentDidMount, componentWillUnmount since there are no dependencies
  useEffect(() => {
    console.log("UseEffect: on mount effect");
    fetchUserInfo();
    return () => {
      console.log("UseEffect: on mount cleanup effect");
    };
  }, []);

  // lifecycle events - componentDidMount, componentDidUpdate, componentWillUnmount since there is some dependencies.
  // componentWillMount can be accessed through cleanup function which is given as return value
  // 1. effect atleast gets triggered once - because of componentDidMount lifecycle event.
  // 2. cleanup function will be called when dependency changes, and before the effect re-runs - componentWillUnmount
  // 3. effect will re-run when dependency changes - componentDidUpdate
  // ref as dependency doesn't trigger effect.
  // when a specific property of an object is given as dependency,
  // - effect will be triggered only if that property changes
  useEffect(() => {
    console.log("UseEffect: on todo effect");
    if (!todo) return;
    setTodoCompleteStatus(todo.completed ? "COMPLETED" : "PENDING");
    return () => {
      console.log("UseEffect: on todo cleanup effect");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo?.completed]);

  return (
    <section id="useEffect">
      <button onClick={fetchUserInfo}>Refetch</button>
      <div>{JSON.stringify(todo)}</div>
      {todo && (
        <form>
          <div>
            <input
              checked={todo.completed}
              type="checkbox"
              onChange={updateUserInfo}
              name="completed"
            />
            <input value={todo.title} onChange={updateUserInfo} name="title" />
          </div>
        </form>
      )}
      <span>Todo Completed: {todoCompleteStatus}</span>
    </section>
  );
};

export default UseEffect;
