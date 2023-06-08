import { Link } from "wouter";

const Links = () => {
  return (
    <section id="links">
      <img className="logo react" width="100" src="/react.svg" alt="React" />
      Links to sections
      <ul>
        <li>
          <Link href="/useState">useState</Link>
        </li>
        <li>
          <Link href="/useEffect">useEffect</Link>
        </li>
        <li>
          <Link href="/useContext">useContext</Link>
        </li>
        <li>
          <Link href="/useReducer">useReducer</Link>
        </li>
        <li>
          <Link href="/useCallback">useCallback</Link>
        </li>
        <li>
          <Link href="/useMemo">useMemo</Link>
        </li>
        <li>
          <Link href="/useRef">useRef</Link>
        </li>
        <li>
          <Link href="/useImperativeHandle">useImperativeHandle</Link>
        </li>
        <li>
          <Link href="/useLayoutEffect">useLayoutEffect</Link>
        </li>
        <li>
          <Link href="/useDebugValue">useDebugValue</Link>
        </li>
      </ul>
    </section>
  );
};

export default Links;
