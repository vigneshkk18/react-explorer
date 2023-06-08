import {
  ChangeEventHandler,
  useContext,
  createContext,
  useState,
  memo,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

interface UserContext {
  user:
    | {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        avatar: string;
      }
    | undefined;
  updateUser: ChangeEventHandler<HTMLInputElement>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const UserContext = createContext<UserContext>({
  user: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateUser: () => {},
  count: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCount: () => {},
});

const Print = () => {
  const { user } = useContext(UserContext);
  console.log("UseContext: Print Component re-rendered");
  return <span>{JSON.stringify(user)}</span>;
};

const Edit = () => {
  const { updateUser, user } = useContext(UserContext);
  console.log("UseContext: Edit Component re-rendered");

  if (!user) return null;

  return (
    <form>
      <div>
        <label htmlFor="email">Email: </label>
        <input value={user.email} onChange={updateUser} name="email" />
      </div>
      <div>
        <label htmlFor="first_name">First Name: </label>
        <input
          value={user["first_name"]}
          onChange={updateUser}
          name="first_name"
        />
      </div>
      <div>
        <label htmlFor="last_name">Last Name: </label>
        <input
          value={user["last_name"]}
          onChange={updateUser}
          name="last_name"
        />
      </div>
    </form>
  );
};

const PrintCount = () => {
  console.log("UseContext: PrintCount re-rendered");
  return (
    <UserContext.Consumer>
      {({ count }) => <p>Count is: {count}</p>}
    </UserContext.Consumer>
  );
};

const UpdateCount = () => {
  const { setCount } = useContext(UserContext);
  console.log("UseContext: UpdateCount re-rendered");
  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>Count++</button>
    </div>
  );
};

const ChildL3 = () => {
  console.log("UseContext: childL3 re-rendered");
  // Components consuming context values will re-render no matter what value in the context changes.
  // Print component only uses user state. But it will re-render even if count state in context changes.
  // wrapping components consuming context values with memo doesn't have any effect.
  return (
    <div>
      <p>Level 3</p>
      <Print />
      <Edit />
      <PrintCount />
      <UpdateCount />
    </div>
  );
};

const ChildL2 = () => {
  console.log("UseContext: childL2 re-rendered");
  return (
    <div>
      <span>Level 2</span>
      <ChildL3 />
    </div>
  );
};

const ChildL1 = memo(() => {
  console.log("UseContext: childL1 re-rendered");
  return (
    <div>
      <span>Level 1</span>
      <ChildL2 />
    </div>
  );
});

const UseContext = () => {
  const [user, setUser] = useState<UserContext["user"]>();
  const [count, setCount] = useState(0);
  console.log("UseContext: UserContext re-rendered");

  useEffect(() => {
    console.log("UseContext: useeffect mount");
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const randomId = ids[Math.floor(Math.random() * ids.length)];
    fetch(`https://reqres.in/api/users/${randomId}`)
      .then((res) => res.json())
      .then((res) => setUser(res.data));
  }, []);

  const updateUser: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    if (!user) return;
    setUser({ ...user, [target.name]: target.value });
  };

  // With Context we can easily share data to child components without sending it through props.
  // Parent component must be wrapped inside Context.Provider
  // can be consumed using useContext / Context.Consumer
  // even though ChildL1 is not using context, as well as some other components it gets re-rendered whenever context value changes
  // if we want to not re-render a component which is not using context that must be wrapped in an memo.
  // NOTE: It is possible to have more than one context providers, and context consumers will always look for the closest Provider.
  return (
    <UserContext.Provider value={{ user, updateUser, count, setCount }}>
      <section id="useContext">
        <span>{JSON.stringify(user)}</span>
        <ChildL1 />
      </section>
    </UserContext.Provider>
  );
};

export default UseContext;
