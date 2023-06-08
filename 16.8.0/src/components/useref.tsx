import { useRef, FormEventHandler } from "react";

const UseRef = () => {
  // with useRef we can create a mutable reference that persists across renders.
  const userNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const submitForm: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!userNameRef.current || !emailRef.current) return;
    const username = userNameRef.current.value;
    const email = emailRef.current.value;

    if (!username) {
      userNameRef.current.focus();
      return;
    }

    if (!email) {
      emailRef.current.focus();
      return;
    }

    console.log({ username, email });
  };

  console.log("UseRef: useref re-rendered");
  // we can pass ref to HTML tags, then through this ref we will be able to acess DOM level methods available for the element.
  return (
    <section id="useRef">
      <form onSubmit={submitForm}>
        <div>
          <label>
            Username:
            <input ref={userNameRef} name="username" />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input ref={emailRef} name="email" />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default UseRef;
