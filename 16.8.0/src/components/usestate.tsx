import { ChangeEventHandler, memo, useState } from "react";

// when memoed component re-renders only if count changes
// without memo component will re-render in all cases
const ChildWithStateProp = memo(({ count }: { count: number }) => {
  console.log("UseState: ChildWithState rendered");
  return <span>Current count: {count}</span>;
});

// when memoed component doesn't re-render
// without memo component will re-render in all cases
const ChildWithoutChildren = memo(() => {
  console.log("UseState: ChildWithoutChildren rendered");
  return <span>Children without state prop</span>;
});

// when memoed component re-renders only when prop changes,
// - if one of the prop is not a state or memoed value, component will re-render even if Component is memoed
// without memo component will re-render in all cases
const ChildWithObjectState = memo((props: any) => {
  console.log("UseState: ChildWithObjectState rendered");
  return <span>Current state: {JSON.stringify(props)}</span>;
});

const UseState = () => {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [count, setCount] = useState(0);
  // const prevStateRef = useRef<typeof userInfo>();

  const updateUserInfo: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    // NOTE: when updating state with same prev object, still UseState component re-renders, but UseEffect, Child Components didn't re-render.
    // Refer to react-16.8/references/react_16_8_usestate_ref_1.pdf
    // setUserInfo((prev) => {
    //   console.log(
    //     "UseState: ",
    //     prev,
    //     prevStateRef.current,
    //     Object.is(prev, prevStateRef.current)
    //   );
    //   if (target.name === "username") return prev;
    //   const updatedPrev = { ...prev, [target.name]: target.value };
    //   prevStateRef.current = updatedPrev;
    //   return updatedPrev;
    // });
    setUserInfo({ ...userInfo, [target.name]: target.value });
  };

  // useEffect(() => {
  //   console.log("UseState: userInfo value changed - useEffect", userInfo);
  // }, [userInfo]);

  const updateCount = () => {
    setCount(count + 1);
  };
  console.log("UseState: UseState rendered");

  // All react element in an component gets re-rendered when state in the component changes, irrespective of whether it has prop or not or whether that props changes.
  // When a component is wrapped with a memo, it doesn't re-renders when there is no prop or the prop value is same
  return (
    <section id="useState">
      <button onClick={updateCount}>Count is {count}</button>
      <ChildWithoutChildren />
      <ChildWithStateProp count={count} />
      <form>
        <label htmlFor="username">UserName: </label>
        <input
          value={userInfo.username}
          onChange={updateUserInfo}
          type="text"
          name="username"
        />
        <label htmlFor="password">Password: </label>
        <input
          value={userInfo.password}
          onChange={updateUserInfo}
          type="password"
          name="password"
        />
      </form>
      <ChildWithObjectState obj={userInfo} />
    </section>
  );
};

export default UseState;
