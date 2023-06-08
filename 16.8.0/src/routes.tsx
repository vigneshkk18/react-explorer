/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

const UseRef = lazy(() => import("./components/useref"));
const UseMemo = lazy(() => import("./components/usememo"));
const UseState = lazy(() => import("./components/usestate"));
const UseEffect = lazy(() => import("./components/useeffect"));
const UseContext = lazy(() => import("./components/usecontext"));
const UseReducer = lazy(() => import("./components/usereducer"));
const UseCallback = lazy(() => import("./components/usecallback"));
const UseDebugValue = lazy(() => import("./components/usedebugvalue"));
const UseLayoutEffect = lazy(() => import("./components/uselayouteffect"));
const UseImperativeHandle = lazy(
  () => import("./components/useimperativehandle")
);

export const routes = [
  { id: "useState", path: "/useState", component: <UseState /> },
  { id: "useEffect", path: "/useeffect", component: <UseEffect /> },
  { id: "useContext", path: "/usecontext", component: <UseContext /> },
  { id: "useReducer", path: "/usereducer", component: <UseReducer /> },
  { id: "useCallback", path: "/usecallback", component: <UseCallback /> },
  { id: "useMemo", path: "/usememo", component: <UseMemo /> },
  { id: "useRef", path: "/useref", component: <UseRef /> },
  {
    id: "useImperativeHandle",
    path: "/useimperativehandle",
    component: <UseImperativeHandle />,
  },
  {
    id: "useLayoutEffect",
    path: "/uselayouteffect",
    component: <UseLayoutEffect />,
  },
  { id: "useDebugValue", path: "/useDebugValue", component: <UseDebugValue /> },
];
