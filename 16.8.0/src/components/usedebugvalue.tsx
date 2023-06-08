import { useState, useEffect, useDebugValue } from "react";

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const useCount = (startNumber: number = 0) => {
  const [count, setCount] = useState(startNumber);
  // used to give custom name to hooks
  useDebugValue("count hook");

  useEffect(() => {
    setInterval(() => setCount((prev) => prev + 1), 1000);
  }, []);

  return count;
};

const Count = () => {
  const count = useCount();

  return <span>Count is {count}</span>;
};

const UseDebugValue = () => {
  return (
    <section id="useDebugValue">
      <Count />
    </section>
  );
};

export default UseDebugValue;
