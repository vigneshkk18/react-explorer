import { useLayoutEffect, useEffect, useState, useRef } from "react";

const CountWithUseEffect = ({ count }: { count: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    console.log("UseLayoutEffect: useeffect triggered");

    if (!ref.current) return;

    const now = performance.now();
    while (performance.now() - now < 500) {
      // Do nothing for a bit...
    }
    ref.current.style.fontSize =
      (+ref.current.style.fontSize || 0) + count + "rem";

    return () => {
      console.log("UseLayoutEffect: useeffect cleanup");
    };
  }, [count]);

  return <span ref={ref}>Count is {count}</span>;
};

const CountWithUseLayoutEffect = ({ count }: { count: number }) => {
  const ref = useRef<HTMLSpanElement>(null);

  // It runs synchronously after all DOM mutations.
  // It's useful for measurements or DOM manipulations that need to occur before the browser paints
  useLayoutEffect(() => {
    console.log("UseLayoutEffect: uselayouteffect triggered");

    if (!ref.current) return;

    const now = performance.now();
    while (performance.now() - now < 500) {
      // Do nothing for a bit...
    }
    ref.current.style.fontSize =
      (+ref.current.style.fontSize || 0) + count + "rem";

    return () => {
      console.log("UseLayoutEffect: uselayouteffect cleanup");
    };
  }, [count]);

  return <span ref={ref}>Count is {count}</span>;
};

const UseLayoutEffect = () => {
  const [count, setCount] = useState(1);

  const updateCount = () => setCount(count + 1);

  console.log("UseLayoutEffect: uselayouteffect re-rendered");
  // In CountWithUseEffect state updates first, then the font size increases
  // But In CountWithUseLayoutEffect both of them happen at the same time, since layouteffect blocks the ui.
  return (
    <section id="useLayoutEffect">
      <button onClick={updateCount}>count++</button>
      <CountWithUseEffect count={count} />
      <CountWithUseLayoutEffect count={count} />
    </section>
  );
};

export default UseLayoutEffect;
