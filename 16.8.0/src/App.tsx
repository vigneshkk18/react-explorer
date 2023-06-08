import { Suspense, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "wouter";

import { routes } from "./routes";
import Links from "./components/links";
import Loading from "./components/loading";
import ComponentWrapper from "./components/componentwrapper";

import "./App.css";

function App() {
  const location = useLocation();

  useEffect(() => {
    // clear console output when page changes
    console.clear();
  }, [location]);

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/">
          <Links />
        </Route>
        {routes.map((route) => (
          <Route key={route.id} path={route.path}>
            <ComponentWrapper>{route.component}</ComponentWrapper>
          </Route>
        ))}
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
