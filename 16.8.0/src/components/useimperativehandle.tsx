import { useState, useRef, forwardRef, useImperativeHandle } from "react";

interface Input
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
}

const Input = forwardRef(({ label, ...props }: Input, ref: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // useImperativeHandle with forwardRef can be used to access or invoke things in child components from parent
  // third argument we can pass dependency list, when list changes useImperativeHandle will be invoked again.
  useImperativeHandle(
    ref,
    () => {
      console.log("useImperativeHandle: useimperativehandle invoked");
      return {
        focus: () => {
          if (!inputRef.current) return;
          inputRef.current.focus();
        },
      };
    },
    []
  );

  console.log("useImperativeHandle: Input re-rendered");
  return (
    <label>
      {label}
      <input ref={inputRef} {...props} />
    </label>
  );
});

const UseImperativeHandle = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef<{ focus: () => void }>(null);

  const onFocusClick = () => {
    inputRef.current?.focus();
  };

  console.log("useImperativeHandle: useimperativehandle re-rendered");
  return (
    <section id="useImperativeHandle">
      <Input
        value={value}
        onChange={({ target }) => setValue(target.value)}
        label="UserName:"
        ref={inputRef}
      />
      <button onClick={onFocusClick}>focus</button>
    </section>
  );
};

export default UseImperativeHandle;
